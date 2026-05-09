import 'array-unique-proposal';

import { GitTemplate } from '@freecodecamp-chengdu/hop-service';
import { components } from '@octokit/openapi-types';
import { githubClient, RepositoryFilter, RepositoryModel } from 'mobx-github';
import { toggle } from 'mobx-restful';

import { GITHUB_PAT } from '../configuration';
import { TeamWorkModel } from './Activity/Team';
import { TableModel } from './Base';
import sessionStore from './User/Session';

type Repository = components['schemas']['repository'];

githubClient.use(({ request }, next) => {
  const { accessToken = GITHUB_PAT } = sessionStore.metaOAuth.github || {};

  if (accessToken) request.headers = { ...request.headers, Authorization: `Bearer ${accessToken}` };

  return next();
});

export class GitModel extends TableModel<GitTemplate> {
  constructor(public baseURI: string) {
    super();
    this.baseURI = `${baseURI}/git-template`;
  }

  @toggle('uploading')
  async createOneFrom(templateURI: string, name: string, cnbToken?: string) {
    const { body } = await githubClient.post<Repository>(`repos/${templateURI}/generate`, { name });
    const repo = body!;

    if (cnbToken) await this.createCNBWorkspace(repo.html_url, repo.name, cnbToken);

    return repo;
  }

  async createCNBWorkspace(githubRepoURL: string, name: string, cnbToken: string) {
    const cnbHeaders = {
      Authorization: `Bearer ${cnbToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.cnb.api+json',
    };

    const userResp = await fetch('https://api.cnb.cool/user', { headers: cnbHeaders });
    if (!userResp.ok) throw new Error(`CNB authentication failed: ${userResp.status}`);
    const { username } = (await userResp.json()) as { username: string };

    const repoResp = await fetch(`https://api.cnb.cool/${username}/-/repos`, {
      method: 'POST',
      headers: cnbHeaders,
      body: JSON.stringify({ name, visibility: 'private' }),
    });
    if (!repoResp.ok) throw new Error(`CNB repo creation failed: ${repoResp.status}`);
    const repoPath = `${username}/${name}`;

    const pushResp = await fetch('/api/git/cnb-push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repoPath, githubRepoURL, cnbToken }),
    });
    if (!pushResp.ok) throw new Error(`CNB git push failed: ${pushResp.status}`);

    const workspaceResp = await fetch(`https://api.cnb.cool/${repoPath}/-/workspace/start`, {
      method: 'POST',
      headers: cnbHeaders,
      body: JSON.stringify({ branch: 'main' }),
    });
    if (!workspaceResp.ok) throw new Error(`CNB workspace start failed: ${workspaceResp.status}`);
    const { url } = (await workspaceResp.json()) as { url: string };

    return { repoPath, workspaceURL: url };
  }

  @toggle('uploading')
  addCollaborator(URI: string, user: string) {
    return githubClient.put(`repos/${URI}/collaborators/${user}`);
  }
}

export class WorkspaceModel extends TeamWorkModel {
  constructor(baseURI: string) {
    super(baseURI);
    this.baseURI = `${baseURI}/work/git-repository`;
  }
}

export const SourceRepository = [
  ['kaiyuanshe/open-hackathon'],
  [
    'kaiyuanshe/OpenHackathon-Web',
    'kaiyuanshe/open-hackathon-api',
    'kaiyuanshe/open-hackathon-guacamole',
    'kaiyuanshe/cloudengine',
  ],
  [
    'FreeCodeCamp-Chengdu/HOP',
    'FreeCodeCamp-Chengdu/HOP-service',
    'FreeCodeCamp-Chengdu/HOP-server',
  ],
];

export class SourceRepositoryModel extends RepositoryModel {
  async loadPage(page: number, per_page: number, { relation }: RepositoryFilter) {
    const list = SourceRepository.flat()
      .uniqueBy()
      .slice((page - 1) * per_page, page * per_page);

    const pageData: Awaited<ReturnType<RepositoryModel['getOne']>>[] = [];

    for (const full_name of list) {
      const item = await this.getOne(full_name, relation);

      pageData.push(item);
    }
    return { pageData, totalCount: list.length };
  }
}
