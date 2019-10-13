import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
import {CrfMail} from "../../model/CrfMail";

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class RecapComponent implements OnInit {

  @Output() missionsLoaded = new EventEmitter<MissionDay[]>();
  @Output() mailsCreated = new EventEmitter<CrfMail[]>();
  @Input() missions: MissionDay[];

  timeSlotForm = new FormGroup({
    'startDate': new FormControl(new Date()),
    'endDate': new FormControl(new Date())
  });

  crfMails: CrfMail[];

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
    this.missions = this.missions.filter(mission => mission.missions.length !== 0);
  }

  private loadMissions(login: PegassLogin) {
    const spinner = this.dialog.open(DialogSpinnerComponent);
    this.crfService.loadAllMissions(
      login,
      encodeURIComponent(moment(this.startDate.value).startOf('day').format()),
      encodeURIComponent(moment(this.endDate.value).endOf('day').format())
    )
      .subscribe(missions => {
        this.missionsLoaded.emit(missions);
        spinner.close();
      });
  }


  sendRecap() {
    this.crfService.generateMails(this.missions).subscribe(crfMails => {
      this.mailsCreated.emit(crfMails);
    })
  }

  missingSummary(mission: Mission): string {
    return "Manque " + mission.missingRoles
      .map(missingRole => missingRole.quantity + " " + missingRole.type)
      .join(", ");
  }
}
