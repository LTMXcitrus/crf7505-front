import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CrfMail} from '../model/CrfMail';
import {Mission} from '../model/Mission';
import {Activities} from "../model/Activities";

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {

  crfMails: CrfMail[];
  activities: Activities;
  selectedTab = 0;

  constructor(private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  whenMailsCreated(mails: CrfMail[]) {
    console.log('new mails created', this.selectedTab)
    this.crfMails = mails;
    this.selectedTab = 2;
  }

  removeMission(mission: Mission) {
    this.activities.externalActivities = this.activities.externalActivities.filter(ms => ms !== mission);
    this.ref.detectChanges();
  }

  removeLocalMission(mission: Mission) {
    this.activities.localActivities = this.activities.localActivities.filter(ms => ms !== mission);
    this.ref.detectChanges();
  }
}
