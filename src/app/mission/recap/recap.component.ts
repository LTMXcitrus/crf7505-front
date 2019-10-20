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
import {DialogMailEditorComponent} from '../dialog-mail-editor/dialog-mail-editor.component';
import {TranslateRolePipe} from "../../translate-role.pipe";

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class RecapComponent implements OnInit {

  @Output() missionsLoaded = new EventEmitter<Mission[]>();
  @Output() mailsCreated = new EventEmitter<CrfMail[]>();
  @Output() removeMission = new EventEmitter<Mission>();
  @Input() missions: Mission[];

  missionsByDay: Map<string, Mission[]> = new Map();

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
    this.groupByDay(this.missions);
  }

  private groupByDay(missions: Mission[]) {
    if (missions) {
      const missionsByDay = groupBy('date')(missions);
      const map = new Map();
      Object.keys(missionsByDay).forEach(key => {
        map.set(key, missionsByDay[key]);
      });
      this.missionsByDay = map;
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
    this.groupByDay(this.missions);

  }

  private loadMissions(login: PegassLogin) {
    const spinner = this.dialog.open(DialogSpinnerComponent, {data: 'Récupération des données de Pegass...'});
    this.crfService.loadAllMissions(
      login,
      encodeURIComponent(moment(this.startDate.value).startOf('day').format()),
      encodeURIComponent(moment(this.endDate.value).endOf('day').format())
    )
      .subscribe(
        missions => {
        this.missionsLoaded.emit(missions);
        this.groupByDay(missions);
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
        console.log(data)
        const ref = this.dialog.open(DialogSpinnerComponent, {data: 'Génération des mails...'});
        this.crfService.generateMails(this.missions, data.subject, data.header, data.footer).subscribe(crfMails => {
          this.mailsCreated.emit(crfMails);
          ref.close();
        });
      }
    });
  }
}
