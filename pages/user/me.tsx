import { User } from '@freecodecamp-chengdu/hop-service';
import { GetServerSideProps, NextPage } from 'next';
import { compose, JWTProps, Middleware } from 'next-ssr-middleware';

import { githubSigner, jwtSigner } from '../api/core';

const redirectToMyProfile: Middleware<Record<string, any>, JWTProps<User>> = async (
  _context,
  next,
) => {
  const result = await next();

  if ('props' in result) {
    const { jwtPayload } = result.props as JWTProps<User>;

    if (jwtPayload?.id)
      return {
        redirect: {
          destination: `/user/${jwtPayload.id}`,
          permanent: false,
        },
      };
  }
  return result;
};

export const getServerSideProps: GetServerSideProps = compose(
  redirectToMyProfile,
  jwtSigner,
  githubSigner,
);

const MyProfileRedirectPage: NextPage = () => null;

export default MyProfileRedirectPage;
