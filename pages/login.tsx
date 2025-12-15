import { User } from '@freecodecamp-chengdu/hop-service';
import { JWTProps } from 'next-ssr-middleware';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';

import { PageHead } from '../components/layout/PageHead';
import sessionStore from '../models/User/Session';
import { sessionGuard } from './api/core';

export const getServerSideProps = sessionGuard;

const LoginPage: FC<JWTProps<User>> = ({ jwtPayload }) => {
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (jwtPayload) {
      sessionStore.user = jwtPayload;

      const targetUrl = typeof redirect === 'string' ? redirect : '/';
      router.replace(targetUrl);
    }
  }, [jwtPayload, redirect, router]);

  return (
    <>
      <PageHead title="登录中..." />
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" className="mb-3" />
        <p>正在登录，请稍候...</p>
      </Container>
    </>
  );
};

export default LoginPage;
