import { User, UserRankListChunk } from '@freecodecamp-chengdu/hop-service';

import { Filter, TableModel } from '../Base';

export interface UserFilter extends Filter<User> {
  keywords?: string;
}

export class UserModel extends TableModel<User, UserFilter> {
  baseURI = 'user';

  async getUserTopList() {
    const { body } = await this.client.get<UserRankListChunk>(`activity-log/user-rank`);
    return body!.list;
  }
}

export default new UserModel();
