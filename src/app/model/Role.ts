import {RoleType} from "./RoleType";

export class Role {
  constructor(public type: RoleType,
              public quantity: number,
              public beginDate?: any,
              public endDate?: any) {

  }
}
