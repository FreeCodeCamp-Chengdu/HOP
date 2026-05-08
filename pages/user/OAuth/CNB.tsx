import { observer } from 'mobx-react';
import { GetServerSideProps } from 'next';
import { FC, useContext } from 'react';
import { Alert, Button, Container, Form, InputGroup } from 'react-bootstrap';
import { buildURLData } from 'web-utility';

import { PageHead } from '../../../components/layout/PageHead';
import { isProduction } from '../../../configuration';
import { I18nContext } from '../../../models/Base/Translation';
import type { SignInPageProps } from '../signIn';

const CNB_API_BASE = 'https://api.cnb.cool';

interface CNBError {
  errcode: number;
  errmsg: string;
  errparam: object;
}

export const getServerSideProps: GetServerSideProps<SignInPageProps> = async ({
  query,
  req,
  res,
}) => {
  const { callback = '/', token } = query;
  const destination = callback + '';

  // Step 1: Form submitted with a token — store it in cookie, redirect to self to trigger validation.
  if (token) {
    res.setHeader(
      'Set-Cookie',
      [`CNB_token=${token}`, 'Path=/', isProduction ? 'Secure' : '', 'SameSite=Lax']
        .filter(Boolean)
        .join('; '),
    );
    return {
      redirect: {
        destination: `/user/OAuth/CNB?${buildURLData({ callback })}`,
        permanent: false,
      },
    };
  }
  // Step 2: CNB_token cookie present — validate against the CNB API.
  const { CNB_token } = req.cookies;

  if (CNB_token) {
    let errorMessage: string | undefined;
    try {
      const response = await fetch(`${CNB_API_BASE}/user`, {
        headers: { Authorization: `Bearer ${CNB_token}` },
      });
      if (response.ok)
        // Valid token — let the sign-in page mint the JWT.
        return { redirect: { destination, permanent: false } };

      const body = (await response.json()) as CNBError;

      errorMessage = body.errmsg || response.statusText;
    } catch (error) {
      errorMessage = (error as Error).message;
    }
    // Invalid — clear the cookie and show the error.
    res.setHeader(
      'Set-Cookie',
      ['CNB_token=', 'Path=/', 'Expires=Thu, 01 Jan 1970 00:00:00 GMT'].join('; '),
    );
    return { props: { callback: destination, error: errorMessage } };
  }

  return { props: { callback: destination } };
};

const CNBOAuthPage: FC<SignInPageProps> = observer(({ callback, error }) => {
  const { t } = useContext(I18nContext);

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 gap-3">
      <PageHead title={t('sign_in_with', 'CNB')} />
      <h1>{t('sign_in_with', 'CNB')}</h1>
      <Form className="d-flex flex-column gap-3 w-100" style={{ maxWidth: 400 }}>
        <input type="hidden" name="callback" value={callback} />
        <InputGroup>
          <Form.Control name="token" placeholder={t('personal_access_token')} required />
          <Button
            href="https://cnb.cool/profile/token"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline-secondary"
            size="sm"
          >
            {t('generate_token')}
          </Button>
        </InputGroup>
        {error && <Alert variant="danger">{error}</Alert>}

        <Button type="submit">{t('sign_in')}</Button>
      </Form>
    </Container>
  );
});

export default CNBOAuthPage;
