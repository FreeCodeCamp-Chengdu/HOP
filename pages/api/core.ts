import { User } from '@freecodecamp-chengdu/hop-service';
import { JsonWebTokenError, verify } from 'jsonwebtoken';
import { Context, Middleware, ParameterizedContext } from 'koa';
import JWT from 'koa-jwt';
import { HTTPError } from 'koajax';
import { DataObject } from 'mobx-restful';
import { compose, githubOAuth2, JWTProps, KoaOption, withKoa } from 'next-ssr-middleware';

import { JWT_SECRET, VERCEL } from '../../configuration';

export type JWTContext = ParameterizedContext<
  { jwtOriginalError: JsonWebTokenError } | { user: { email: string } }
>;

export const parseJWT = JWT({
  secret: JWT_SECRET!,
  cookie: 'token',
  passthrough: true,
});

export const verifyJWT = JWT({ secret: JWT_SECRET!, cookie: 'token' });

export const safeAPI: Middleware<any, any> = async (context: Context, next) => {
  try {
    return await next();
  } catch (error) {
    if (!(error instanceof HTTPError)) {
      console.error(error);

      context.status = 400;

      return (context.body = { message: (error as Error).message });
    }
    const { message, response } = error;
    let { body } = response;

    context.status = response.status;
    context.statusMessage = message;

    if (body instanceof ArrayBuffer)
      try {
        body = new TextDecoder().decode(new Uint8Array(body));

        body = JSON.parse(body);
      } catch {
        //
      }
    console.error(JSON.stringify(body, null, 2));

    context.body = body;
  }
};

export const withSafeKoa = <S, C>(...middlewares: Middleware<S, C>[]) =>
  withKoa<S, C>({} as KoaOption, safeAPI, ...middlewares);

const client_id = process.env.GITHUB_OAUTH_CLIENT_ID,
  client_secret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

if (!client_id || !client_secret)
  throw new ReferenceError(
    `[OAuth Config Error] Missing required environment variables:
  - GITHUB_OAUTH_CLIENT_ID
  - GITHUB_OAUTH_CLIENT_SECRET
Please configure them in .env.local or environment settings.`,
  );

export const ProxyBaseURL = 'https://test.hackathon.fcc-cd.dev/proxy';

export const githubSigner = githubOAuth2({
  rootBaseURL: VERCEL ? undefined : `${ProxyBaseURL}/github.com/`,
  client_id,
  client_secret,
  scopes: ['user:email', 'read:user', 'public_repo', 'read:project'],
});

export const sessionGuard = compose<DataObject, JWTProps<User>>(async ({ req }, next) => {
  const { JWT = '' } = req.cookies;

  try {
    const jwtPayload = verify(JWT, JWT_SECRET!) as User;
    const nextResult = await next();

    return 'props' in nextResult ? { props: { ...nextResult.props, jwtPayload } } : nextResult;
  } catch (error) {
    console.error((error as JsonWebTokenError).message, JWT);

    return {
      redirect: {
        destination: `/user/signIn?callback=${encodeURIComponent(req.url || '/')}`,
        permanent: false,
      },
    };
  }
});
