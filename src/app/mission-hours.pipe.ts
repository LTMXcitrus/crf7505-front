import {Pipe, PipeTransform} from '@angular/core';
import {Mission} from './model/Mission';
import * as moment from 'moment';

@Pipe({
  name: 'missionHours'
})
export class MissionHoursPipe implements PipeTransform {
  private hourFormat = 'HH[h]mm';

  transform(mission: Mission, args?: any): any {

    const start = moment(mission.beginDate).format(this.hourFormat);
    const end = moment(mission.endDate).format(this.hourFormat);
    return `de ${start} à ${end}`;
  }

}
