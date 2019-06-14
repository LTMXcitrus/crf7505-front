import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CrfService} from '../../api/crf.service';
import {PegassLoginService} from '../../pegass-login.service';
import {PegassLogin} from '../../model/PegassLogin';
import * as moment from 'moment';
import {MissionDay} from '../../model/MissionDay';
import {MatDialog} from '@angular/material';
import {MissionDetailsComponent} from './mission-details/mission-details.component';
import {Mission} from '../../model/Mission';
import {DialogSpinnerComponent} from '../../dialog-spinner/dialog-spinner.component';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class RecapComponent implements OnInit {

  missions: MissionDay[];

  timeSlotForm = new FormGroup({
    'startDate': new FormControl(new Date()),
    'endDate': new FormControl(new Date())
  });

  constructor(private crfService: CrfService,
              private pegassLoginService: PegassLoginService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    moment.locale('fr');
  }

  get startDate() {
    return this.timeSlotForm.get('startDate');
  }

  get endDate() {
    return this.timeSlotForm.get('endDate');
  }

  getMissions() {
    this.pegassLoginService.login().then(pegassLogin => {
      this.loadMissions(pegassLogin);
    });
  }

  openDetails(mission: Mission) {
    this.dialog.open(MissionDetailsComponent, {
      data: {
        mission: mission
      }
    });
  }

  remove(day: MissionDay, mission: Mission) {
    console.log(day);
    day.missions = day.missions.filter(dayMission => dayMission !== mission);
  }

  private loadMissions(login: PegassLogin) {
    const spinner = this.dialog.open(DialogSpinnerComponent);
    this.crfService.loadAllMissions(
      login,
      encodeURIComponent(moment(this.startDate.value).startOf('day').format()),
      encodeURIComponent(moment(this.endDate.value).endOf('day').format())
    )
      .subscribe(missions => {
        this.missions = missions;
        spinner.close();
      });
  }


}
