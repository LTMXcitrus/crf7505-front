import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CrfService} from '../../api/crf.service';
import {PegassLoginService} from '../../pegass-login.service';
import {PegassLogin} from '../../model/PegassLogin';
import * as moment from 'moment';
import {MatDialog} from '@angular/material';
import {MissionDetailsComponent} from './mission-details/mission-details.component';
import {Mission} from '../../model/Mission';
import {DialogSpinnerComponent} from '../../dialog-spinner/dialog-spinner.component';
import {CrfMail} from '../../model/CrfMail';
import {groupBy} from '../../utils';
import {DialogMailEditorComponent} from '../mails/dialog-mail-editor/dialog-mail-editor.component';
import {TranslateRolePipe} from "../../translate-role.pipe";
import {Activities} from "../../model/Activities";

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class RecapComponent implements OnInit {

  @Output() activitiesLoaded = new EventEmitter<Activities>();
  @Output() mailsCreated = new EventEmitter<CrfMail[]>();
  @Output() removeMission = new EventEmitter<Mission>();
  @Output() removeLocalMission = new EventEmitter<Mission>();
  @Input() activities: Activities;

  missionsByDay: Map<string, Mission[]> = new Map();
  localMissions: Map<string, Mission[]> = new Map();

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

  private groupByDay(missions: Mission[]): Map<string, Mission[]> {
    if (missions) {
      const missionsByDay = groupBy('date')(missions);
      const map = new Map();
      Object.keys(missionsByDay).forEach(key => {
        map.set(key, missionsByDay[key]);
      });
      return map
    }
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

  remove(day: string, mission: Mission) {
    this.removeMission.emit(mission);
    this.missionsByDay = this.groupByDay(this.activities.externalActivities);
  }

  removeLocal(day: string, mission: Mission) {
    this.removeLocalMission.emit(mission);
    this.localMissions = this.groupByDay(this.activities.localActivities);
  }

  private loadMissions(login: PegassLogin) {
    const spinner = this.dialog.open(DialogSpinnerComponent, {data: 'Récupération des données de Pegass...'});
    this.crfService.loadAllMissions(
      login,
      encodeURIComponent(moment(this.startDate.value).startOf('day').format()),
      encodeURIComponent(moment(this.endDate.value).endOf('day').format())
    )
      .subscribe(
        activities => {
          this.activitiesLoaded.emit(activities);
          this.missionsByDay = this.groupByDay(activities.externalActivities);
          this.localMissions = this.groupByDay(activities.localActivities);
          spinner.close();
        },
        () => {
          this.pegassLoginService.wrongLogin();
          spinner.close();
        });
  }


  sendRecap() {
    const mailEditorRef = this.dialog.open(DialogMailEditorComponent, {data: {header: '', footer: '', subject: ''}});
    mailEditorRef.afterClosed().subscribe(data => {
      if (data) {
        const ref = this.dialog.open(DialogSpinnerComponent, {data: 'Génération des mails...'});
        this.crfService.generateMails(this.activities, data.subject, data.header, data.footer).subscribe(crfMails => {
          this.mailsCreated.emit(crfMails);
          ref.close();
        });
      }
    });
  }
}
