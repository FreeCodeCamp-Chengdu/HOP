import {
  Award,
  AwardAssignment,
  AwardTarget,
} from '@freecodecamp-chengdu/hop-service';
import { ListModel, Stream, toggle } from 'mobx-restful';

import { createListStream, InputData, TableModel } from '../Base';
import sessionStore from '../User/Session';

export { Award, AwardAssignment, AwardTarget };

export class AwardModel extends TableModel<Award> {
  client = sessionStore.client;
  currentAssignment?: AwardAssignmentModel;

  constructor(public baseURI: string) {
    super();
    this.baseURI = `${baseURI}/award`;
  }

  assignmentOf(tid = this.currentOne.id) {
    return (this.currentAssignment = new AwardAssignmentModel(`${this.baseURI}/${tid}`));
  }

  openStream() {
    return createListStream<Award>(
      `${this.baseURI}s`,
      this.client,
      count => (this.totalCount = count),
    );
  }

  @toggle('uploading')
  async updateOne(data: InputData<Award>, id?: string) {
    const { body } = await (id
      ? this.client.patch<Award>(`${this.baseURI}/${id}`, data)
      : this.client.put<Award>(this.baseURI, data));

    return (this.currentOne = body!);
  }
}

export class AwardAssignmentModel extends Stream<AwardAssignment>(ListModel) {
  client = sessionStore.client;

  constructor(baseURI: string) {
    super();
    this.baseURI = `${baseURI}/assignment`;
  }

  openStream() {
    return createListStream<AwardAssignment>(
      `${this.baseURI}s`,
      this.client,
      count => (this.totalCount = count),
    );
  }

  @toggle('uploading')
  async updateOne(data: InputData<AwardAssignment>, id?: string) {
    const { body } = await (id
      ? this.client.patch<AwardAssignment>(`${this.baseURI}/${id}`, data)
      : this.client.put<AwardAssignment>(this.baseURI, data));

    return (this.currentOne = body!);
  }
}
