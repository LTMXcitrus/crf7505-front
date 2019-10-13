import {Component, OnInit} from '@angular/core';
import {CrfMail} from "../model/CrfMail";
import {MissionDay} from "../model/MissionDay";

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {

  crfMails: CrfMail[];
  missions: MissionDay[];
  selectedTab = 0;

  constructor() {
  }

  ngOnInit() {
  }

  whenMailsCreated(mails: CrfMail[]) {
    this.crfMails = mails;
    this.selectedTab = 2;
  }
}
