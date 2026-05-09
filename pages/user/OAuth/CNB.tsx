import { IncomingMessage } from 'http';

import { observer } from 'mobx-react';
import { GetServerSideProps } from 'next';
import { FC, useContext } from 'react';
import { Alert, Button, Container, Form, InputGroup } from 'react-bootstrap';
import { buildURLData } from 'web-utility';

import { PageHead } from '../../../components/layout/PageHead';
import { isProduction } from '../../../configuration';
import { I18nContext } from '../../../models/Base/Translation';
import { sanitizeCallback } from '../../../utils/url';
import type { SignInPageProps } from '../signIn';

const CNB_API_BASE = 'https://api.cnb.cool';

interface CNBError {
  errcode: number;
  errmsg: string;
  errparam: object;
}

const MAX_BODY_BYTES = 4096;

const parseFormBody = (req: IncomingMessage) =>
  new Promise<URLSearchParams>((resolve, reject) => {
    let data = '';
    let size = 0;
    req.on('data', (chunk: Buffer) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        req.destroy(new Error('Request body too large'));
        return;
      }
      data += chunk.toString();
    });
    req.on('end', () => resolve(new URLSearchParams(data)));
    req.on('error', reject);
  });

export const getServerSideProps: GetServerSideProps<SignInPageProps> = async ({
  query,
  req,
  res,
}) => {
  const { callback = '/' } = query;
  const destination = sanitizeCallback(callback + '');

  // Step 1: Form submitted via POST with a token — store it in cookie, redirect to self (GET).
  if (req.method === 'POST') {
    const body = await parseFormBody(req);
    const token = body.get('token');

    if (token) {
      res.setHeader(
        'Set-Cookie',
        [`CNB_token=${token}`, 'Path=/', isProduction ? 'Secure' : '', 'SameSite=Lax']
          .filter(Boolean)
          .join('; '),
      );
      return {
        redirect: {
          // Pass the already-sanitized destination so the subsequent GET
          // still has a safe callback value in its query string.
          destination: `/user/OAuth/CNB?${buildURLData({ callback: destination })}`,
          permanent: false,
        },
      };
    }
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

      const cnbBody = (await response.json()) as CNBError;

      errorMessage = cnbBody.errmsg || response.statusText;
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
      <Form
        action={`/user/OAuth/CNB?${buildURLData({ callback })}`}
        method="post"
        className="d-flex flex-column gap-3 w-100"
        style={{ maxWidth: 400 }}
      >
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
