import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JsonWebTokenError, verify } from 'jsonwebtoken';
import { HTTPError } from 'koajax';
import { observer } from 'mobx-react';
import { GetServerSideProps } from 'next';
import { FC, useContext } from 'react';
import { Alert, Button, Container, Image } from 'react-bootstrap';
import { buildURLData } from 'web-utility';

import { PageHead } from '../../components/layout/PageHead';
import { isProduction, JWT_SECRET } from '../../configuration';
import { I18nContext } from '../../models/Base/Translation';
import { SessionModel } from '../../models/User/Session';

export interface SignInPageProps {
  callback: string;
  error?: string;
}

export const getServerSideProps: GetServerSideProps<SignInPageProps> = async ({
  query,
  req,
  res,
}) => {
  const { callback = '/' } = query;
  const destination = callback + '';
  const { JWT = '', token, CNB_token } = req.cookies;

  try {
    const user =
      query.OAuth === 'GitHub' && token
        ? await SessionModel.signInWithGitHub(token)
        : query.OAuth === 'CNB' && CNB_token
          ? await SessionModel.signInWithCNB(CNB_token)
          : null;

    if (user) {
      res.setHeader(
        'Set-Cookie',
        [`JWT=${user.token}`, 'Path=/', isProduction ? 'Secure' : '', 'SameSite=Lax']
          .filter(Boolean)
          .join('; '),
      );
      return { redirect: { destination, permanent: false } };
    }
  } catch (error) {
    const { message, response } = error as HTTPError;
    const errorMessage = response?.body?.message || message || 'Unknown error';

    return { props: { callback: destination, error: errorMessage } };
  }
  // If the user is already logged in, skip the sign-in page.
  try {
    verify(JWT, JWT_SECRET!);

    return { redirect: { destination, permanent: false } };
  } catch (error) {
    console.error((error as JsonWebTokenError).message, JWT);
    // Not logged in — fall through to render the sign-in page.
    return { props: { callback: destination } };
  }
};

const SignInPage: FC<SignInPageProps> = observer(({ callback, error }) => {
  const { t } = useContext(I18nContext);

  const oAuthURLOf = (provider: string) =>
    `/user/OAuth/${provider}?${buildURLData({
      callback: `/user/signIn?${buildURLData({ callback, OAuth: provider })}`,
    })}`;

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 gap-3">
      <PageHead title={t('sign_in')} />
      <h1>{t('sign_in')}</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button
        as="a"
        href={oAuthURLOf('GitHub')}
        size="lg"
        className="d-flex align-items-center gap-2"
      >
        <FontAwesomeIcon icon={faGithub} />
        {t('sign_in_with', 'GitHub')}
      </Button>
      <Button
        as="a"
        href={oAuthURLOf('CNB')}
        size="lg"
        variant="outline-dark"
        className="d-flex align-items-center gap-2"
      >
        <Image src="https://cnb.cool/favicon.ico" width={20} height={20} alt="CNB" />
        {t('sign_in_with', 'CNB')}
      </Button>
    </Container>
  );
});

export default SignInPage;
