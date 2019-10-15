import {Role} from './Role';

export class Mission {
  constructor(
    public id: string,
    public beginDate: any,
    public endDate: any,
    public ul: string,
    public name: string,
    public roles: Role[],
    public missingRoles: Role[],
    public hasCommentedInscriptions: boolean,
    public hasModifiedHoursInscriptions: boolean,
    public date: string
  ) {

  }
}
