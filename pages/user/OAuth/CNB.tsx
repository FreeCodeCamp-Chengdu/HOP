import { User } from '@freecodecamp-chengdu/hop-service';
import { verify } from 'jsonwebtoken';
import { observer } from 'mobx-react';
import { GetServerSideProps } from 'next';
import { JWTProps } from 'next-ssr-middleware';
import { FC, useContext } from 'react';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';

import { PageHead } from '../../../components/layout/PageHead';
import { JWT_SECRET } from '../../../configuration';
import { I18nContext } from '../../../models/Base/Translation';
import { cnbSigner } from '../../api/core';

interface CNBOAuthPageProps {
  callback: string;
}

export const getServerSideProps: GetServerSideProps<CNBOAuthPageProps> = async context => {
  const { query, req } = context;
  const callback = (query.callback as string) || '/';

  // If the user is already logged in, redirect to the callback page.
  const { JWT: jwtCookie = '' } = req.cookies;

  try {
    verify(jwtCookie, JWT_SECRET!);
    return { redirect: { destination: callback, permanent: false } };
  } catch {
    // Not logged in — continue below.
  }

  // If the form was submitted with a token, attempt CNB login.
  if (query.token) {
    const result = await cnbSigner(context, async () => ({ props: {} as JWTProps<User> }));

    if ('props' in result && (result.props as JWTProps<User>).jwtPayload)
      return { redirect: { destination: callback, permanent: false } };

    if ('redirect' in result || 'notFound' in result) return result as any;
  }

  return { props: { callback } };
};

const CNBOAuthPage: FC<CNBOAuthPageProps> = observer(({ callback }) => {
  const { t } = useContext(I18nContext);

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 gap-3">
      <PageHead title={t('sign_in_with')('CNB')} />
      <h1>{t('sign_in_with')('CNB')}</h1>
      <Form method="GET" className="d-flex flex-column gap-3 w-100" style={{ maxWidth: 400 }}>
        <input type="hidden" name="callback" value={callback} />
        <InputGroup>
          <Form.Control
            type="text"
            name="token"
            placeholder={t('personal_access_token')}
            required
          />
          <Button
            as="a"
            href="https://cnb.cool/profile/token"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline-secondary"
            size="sm"
          >
            {t('generate_token')}
          </Button>
        </InputGroup>
        <Button type="submit">{t('sign_in')}</Button>
      </Form>
    </Container>
  );
});

export default CNBOAuthPage;
