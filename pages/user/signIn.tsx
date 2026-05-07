import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { verify } from 'jsonwebtoken';
import { observer } from 'mobx-react';
import { GetServerSideProps } from 'next';
import { compose } from 'next-ssr-middleware';
import { FC, useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import { buildURLData } from 'web-utility';

import { PageHead } from '../../components/layout/PageHead';
import { JWT_SECRET } from '../../configuration';
import { I18nContext } from '../../models/Base/Translation';
import { GITHUB_OAUTH_SCOPES, githubSigner, jwtSigner } from '../api/core';

interface SignInPageProps {
  callback: string;
  origin: string;
  clientId: string;
}

export const getServerSideProps: GetServerSideProps<SignInPageProps> = async context => {
  const { query, req } = context;
  const callback = (query.callback as string) || '/';

  // If there is a `code` param, this is the OAuth callback — run the auth
  // chain for the specific platform (githubSigner exchanges the code for a
  // token cookie, jwtSigner then signs a JWT and returns jwtPayload in props).
  if (query.code && query.OAuth === 'GitHub') {
    const result = await compose(jwtSigner, githubSigner)(context);

    if ('props' in result && (result.props as any).jwtPayload)
      return { redirect: { destination: callback, permanent: false } };

    return result as any;
  }

  // If the user is already logged in, skip the sign-in page.
  const { JWT: jwtCookie = '' } = req.cookies;

  try {
    verify(jwtCookie, JWT_SECRET!);
    return { redirect: { destination: callback, permanent: false } };
  } catch {
    // Not logged in — fall through to render the sign-in page.
  }

  const proto =
    (req.headers['x-forwarded-proto'] as string) ||
    ((req as any).socket?.encrypted ? 'https' : 'http');
  const origin = `${proto}://${req.headers.host}`;

  return { props: { callback, origin, clientId: process.env.GITHUB_OAUTH_CLIENT_ID! } };
};

const SignInPage: FC<SignInPageProps> = observer(({ callback, origin, clientId }) => {
  const { t } = useContext(I18nContext);

  const githubRedirectURI = `${origin}/user/signIn?${buildURLData({ callback, OAuth: 'GitHub' })}`;
  const githubOAuthURL = `https://github.com/login/oauth/authorize?${buildURLData({
    client_id: clientId,
    redirect_uri: githubRedirectURI,
    scope: GITHUB_OAUTH_SCOPES.join(' '),
  })}`;

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 gap-3">
      <PageHead title={t('sign_in')} />
      <h1>{t('sign_in')}</h1>
      <Button
        as="a"
        href={githubOAuthURL}
        size="lg"
        className="d-flex align-items-center gap-2"
      >
        <FontAwesomeIcon icon={faGithub} />
        {t('sign_in_with')('GitHub')}
      </Button>
    </Container>
  );
});

export default SignInPage;
