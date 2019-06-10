import {Mission} from "./Mission";

export class MissionDay {
  constructor(public date: string,
              public missions: Mission[]) {
  }
}
