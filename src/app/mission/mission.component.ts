import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CrfMail} from '../model/CrfMail';
import {Mission} from '../model/Mission';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {

  crfMails: CrfMail[];
  missions: Mission[];
  selectedTab = 0;

  constructor(private ref: ChangeDetectorRef) {
  }

  click() {
    console.log(this.missions);
  }

  ngOnInit() {
  }

  whenMailsCreated(mails: CrfMail[]) {
    this.crfMails = mails;
    this.selectedTab = 2;
  }

  removeMission(mission: Mission) {
    this.missions = this.missions.filter(ms => ms !== mission);
    this.ref.detectChanges();
  }
}
