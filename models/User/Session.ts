import { Base, User } from '@freecodecamp-chengdu/hop-service';
import { clear } from 'idb-keyval';
import { HTTPClient } from 'koajax';
import { computed, observable } from 'mobx';
import { BaseModel, persist, restore, toggle } from 'mobx-restful';
import { buildURLData, setCookie, sleep } from 'web-utility';

import { API_HOST, isServer, JWT, token } from '../../configuration';

export const ownClient = new HTTPClient({ baseURI: API_HOST, responseType: 'json' }).use(
  ({ request }, next) => {
    if (JWT) request.headers = { ...request.headers, Authorization: `Bearer ${JWT}` };

    return next();
  },
);

export interface SessionUser
  extends Base, Record<'username' | 'email', string>, Record<'confirmed' | 'blocked', boolean> {
  provider: 'local' | 'github';
  gender?: 'Female' | 'Male' | 'Other';
}

export class SessionModel extends BaseModel {
  client = ownClient;

  @persist()
  @observable
  accessor user: User | undefined;

  restored = !isServer() && restore(this, 'Session');

  @computed
  get metaOAuth() {
    return { github: { accessToken: token } };
  }

  @computed
  get isPlatformAdmin() {
    return !!this.user?.roles.includes(0);
  }

  @toggle('downloading')
  async getProfile() {
    await this.restored;

    if (this.user) return this.user;

    const { body } = await this.client.get<User>('user/session');

    return (this.user = body);
  }

  static async signInWithGitHub(accessToken: string) {
    const { body } = await ownClient.post<User>('user/OAuth/GitHub', {
      accessToken,
    });
    return body!;
  }

  static async signInWithCNB(accessToken: string) {
    const { body } = await ownClient.post<User>('user/OAuth/CNB', {
      accessToken,
    });
    return body!;
  }

  async signOut(reload = false) {
    setCookie('token', '', { path: '/', expires: new Date() });
    setCookie('JWT', '', { path: '/', expires: new Date() });

    this.user = undefined;
    await sleep();
    await clear();

    if (reload) location.reload();
  }

  exportURLOf(reportType: 'enrollments' | 'teams' | 'teamWorks', baseURI: string) {
    const { client, user } = this;

    return (
      new URL(
        `report?${buildURLData({ reportType, token: user?.token })}`,
        `${client.baseURI}${baseURI}`,
      ) + ''
    );
  }
}

export default new SessionModel();
