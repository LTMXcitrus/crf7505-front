import {Training} from './Training';

export class Volunteer {
  constructor(public id: string,
              public firstname: string,
              public lastname: string,
              public trainings: Training[],
              public upToDate: boolean) {
  }
}
