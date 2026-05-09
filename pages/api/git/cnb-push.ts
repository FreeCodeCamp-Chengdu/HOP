import { createHash } from 'node:crypto';
import { deflateSync } from 'node:zlib';
import type { NextApiRequest, NextApiResponse } from 'next';

interface GitObject {
  sha: Buffer;
  content: Buffer;
  type: 'blob' | 'tree' | 'commit';
}

function sha1(data: Buffer): Buffer {
  return createHash('sha1').update(data).digest() as Buffer;
}

function makeBlob(fileContent: string): GitObject {
  const content = Buffer.from(fileContent, 'utf-8');
  const header = Buffer.from(`blob ${content.length}\0`);
  const sha = sha1(Buffer.concat([header, content]));
  return { sha, content, type: 'blob' };
}

function makeTree(entries: Array<{ mode: string; name: string; sha: Buffer }>): GitObject {
  // git requires tree entries sorted by name (directories append '/' for comparison)
  const sorted = [...entries].sort((a, b) => {
    const nameA = a.mode === '40000' ? `${a.name}/` : a.name;
    const nameB = b.mode === '40000' ? `${b.name}/` : b.name;
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
  });
  const content = Buffer.concat(
    sorted.map(e => Buffer.concat([Buffer.from(`${e.mode} ${e.name}\0`), e.sha])),
  );
  const header = Buffer.from(`tree ${content.length}\0`);
  const sha = sha1(Buffer.concat([header, content]));
  return { sha, content, type: 'tree' };
}

function makeCommit(treeSha: Buffer, message: string): GitObject {
  const ts = Math.floor(Date.now() / 1000);
  const author = `HOP <hop@freecodecamp-chengdu.org> ${ts} +0000`;
  const content = Buffer.from(
    `tree ${treeSha.toString('hex')}\nauthor ${author}\ncommitter ${author}\n\n${message}\n`,
  );
  const header = Buffer.from(`commit ${content.length}\0`);
  const sha = sha1(Buffer.concat([header, content]));
  return { sha, content, type: 'commit' };
}

function encodeSizeType(size: number, type: 'blob' | 'tree' | 'commit'): Buffer {
  const typeCode: Record<string, number> = { commit: 1, blob: 3, tree: 4 };
  const code = typeCode[type];
  const bytes: number[] = [];
  let remaining = size;
  const firstByte = ((code & 7) << 4) | (remaining & 0xf);
  remaining >>= 4;
  bytes.push(firstByte);
  while (remaining > 0) {
    bytes[bytes.length - 1] |= 0x80;
    bytes.push(remaining & 0x7f);
    remaining >>= 7;
  }
  return Buffer.from(bytes);
}

function createPack(objects: GitObject[]): Buffer {
  const header = Buffer.allocUnsafe(12);
  header.write('PACK', 0, 'ascii');
  header.writeUInt32BE(2, 4);
  header.writeUInt32BE(objects.length, 8);

  const chunks: Buffer[] = [header];
  for (const obj of objects) {
    const sizeTypeHeader = encodeSizeType(obj.content.length, obj.type);
    const compressed = deflateSync(obj.content);
    chunks.push(sizeTypeHeader, compressed);
  }

  const pack = Buffer.concat(chunks);
  return Buffer.concat([pack, sha1(pack)]);
}

function pktLine(line: string): Buffer {
  const data = Buffer.from(line);
  const len = (data.length + 4).toString(16).padStart(4, '0');
  return Buffer.concat([Buffer.from(len), data]);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { repoPath, githubRepoURL, cnbToken } = req.body as {
    repoPath: string;
    githubRepoURL: string;
    cnbToken: string;
  };
  if (!repoPath || !githubRepoURL || !cnbToken)
    return res.status(400).json({ error: 'Missing required fields' });

  // Validate repoPath to prevent SSRF (must be 'username/reponame' with safe chars only)
  if (!/^[\w.-]+\/[\w.-]+$/.test(repoPath))
    return res.status(400).json({ error: 'Invalid repository path' });

  // Validate that githubRepoURL is a plain GitHub repo URL (no query string, fragment, or shell chars)
  if (!/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+$/.test(githubRepoURL))
    return res.status(400).json({ error: 'Invalid GitHub repository URL' });

  const initScript = `git clone ${githubRepoURL} ./ && git commit -m "HOP initializes this repository from ${githubRepoURL}" && git push --no-verify`;

  const devcontainerJson = JSON.stringify(
    {
      name: 'HOP Dev Environment',
      image: 'mcr.microsoft.com/devcontainers/base:ubuntu',
      onCreateCommand: initScript,
    },
    null,
    2,
  );

  const dockerfile =
    'FROM mcr.microsoft.com/devcontainers/base:ubuntu\nRUN apt-get update && apt-get install -y git\n';

  const devcontainerBlob = makeBlob(devcontainerJson);
  const dockerfileBlob = makeBlob(dockerfile);

  const devcontainerTree = makeTree([
    { mode: '100644', name: 'devcontainer.json', sha: devcontainerBlob.sha },
    { mode: '100644', name: 'Dockerfile', sha: dockerfileBlob.sha },
  ]);

  const rootTree = makeTree([{ mode: '40000', name: '.devcontainer', sha: devcontainerTree.sha }]);

  const commitObj = makeCommit(rootTree.sha, 'Initial devcontainer configuration');
  const commitShaHex = commitObj.sha.toString('hex');

  const pack = createPack([
    devcontainerBlob,
    dockerfileBlob,
    devcontainerTree,
    rootTree,
    commitObj,
  ]);

  const gitURL = `https://cnb.cool/${repoPath}.git`;
  const authHeader = `Basic ${Buffer.from(`cnb:${cnbToken}`).toString('base64')}`;

  const discoveryResp = await fetch(`${gitURL}/info/refs?service=git-receive-pack`, {
    headers: { Authorization: authHeader },
  });

  if (!discoveryResp.ok)
    return res.status(502).json({ error: `CNB git discovery failed: ${discoveryResp.status}` });

  const zeroSha = '0000000000000000000000000000000000000000';
  const body = Buffer.concat([
    pktLine(`${zeroSha} ${commitShaHex} refs/heads/main\0report-status\n`),
    Buffer.from('0000'),
    pack,
  ]);

  const pushResp = await fetch(`${gitURL}/git-receive-pack`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-git-receive-pack-request',
      Accept: 'application/x-git-receive-pack-result',
      Authorization: authHeader,
    },
    body,
  });

  if (!pushResp.ok) {
    const text = await pushResp.text();
    return res.status(502).json({ error: `CNB git push failed: ${text}` });
  }

  return res.status(200).json({ success: true });
}
