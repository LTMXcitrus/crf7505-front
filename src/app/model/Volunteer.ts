import {RoleType} from "./RoleType";

export class Volunteer {
  constructor(public firstname: string,
              public lastname: string,
              public role: RoleType,
              public emailAddress: string) {

  }
}
