import { compose } from 'next-ssr-middleware';

import { githubSigner } from '../../api/core';

export const getServerSideProps = compose(async ({ query }, next) => {
  const result = await next();

  if ('redirect' in result) return result;

  const { callback = '/' } = query;
  const destination = callback + '';

  return { redirect: { destination, permanent: false } };
}, githubSigner);

export default function GitHubOAuthPage() {
  return null;
}
