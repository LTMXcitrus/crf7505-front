import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'day'
})
export class DayPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    moment.locale('fr');
    return moment(value).format('dddd D MMMM YYYY');
  }

}
