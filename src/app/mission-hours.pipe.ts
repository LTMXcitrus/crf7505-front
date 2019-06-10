import { Pipe, PipeTransform } from '@angular/core';
import {Mission} from "./model/Mission";
import * as moment from "moment";

@Pipe({
  name: 'missionHours'
})
export class MissionHoursPipe implements PipeTransform {
  private hourFormat = 'HH[h]mm';

  transform(mission: Mission, args?: any): any {

    const start = moment(mission.startTime).format(this.hourFormat);
    const end = moment(mission.endTime).format(this.hourFormat);
    return `de ${start} à ${end}`;
  }

}
