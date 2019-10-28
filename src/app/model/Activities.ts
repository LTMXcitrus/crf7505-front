import {Mission} from "./Mission";

export class Activities {
  constructor(public externalActivities: Mission[],
              public localActivities: Mission[],
              public localStructure: string) {
  }
}
