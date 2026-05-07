import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';
import { compose } from 'next-ssr-middleware';
import { FC, useContext } from 'react';
import { Button, Container } from 'react-bootstrap';

import { PageHead } from '../../components/layout/PageHead';
import { I18nContext } from '../../models/Base/Translation';
import { GITHUB_OAUTH_SCOPES, githubSigner, jwtSigner } from '../api/core';

interface SignInPageProps {
  callback: string;
  githubOAuthURL: string;
}

export const getServerSideProps = compose<SignInPageProps>(
  async (context, next) => {
    const { query, req } = context;
    const callback = (query.callback as string) || '/';

    const result = await next();

    if ('props' in result && (result.props as any).jwtPayload) {
      return { redirect: { destination: callback, permanent: false } };
    }

    const proto =
      (req.headers['x-forwarded-proto'] as string) ||
      ((req as any).socket?.encrypted ? 'https' : 'http');
    const origin = `${proto}://${req.headers.host}`;
    const pageUrl = `${origin}/user/signIn?callback=${encodeURIComponent(callback)}`;
    const githubOAuthURL = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(process.env.GITHUB_OAUTH_CLIENT_ID!)}&redirect_uri=${encodeURIComponent(pageUrl)}&scope=${encodeURIComponent(GITHUB_OAUTH_SCOPES.join(','))}`;

    return { props: { callback, githubOAuthURL } };
  },
  jwtSigner,
  githubSigner,
);

const SignInPage: FC<SignInPageProps> = observer(({ githubOAuthURL }) => {
  const { t } = useContext(I18nContext);

  return (
    <>
      <PageHead title={t('sign_in')} />
      <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 gap-3">
        <h1>{t('sign_in')}</h1>
        <Button
          as="a"
          href={githubOAuthURL}
          size="lg"
          className="d-flex align-items-center gap-2"
        >
          <FontAwesomeIcon icon={faGithub} />
          {t('sign_in_with_github')}
        </Button>
      </Container>
    </>
  );
});

export default SignInPage;
