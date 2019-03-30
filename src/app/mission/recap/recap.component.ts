import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CrfService} from "../../api/crf.service";
import {PegassLoginService} from "../../pegass-login.service";
import {PegassLogin} from "../../model/PegassLogin";
import {Mission} from "../../model/Mission";

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class RecapComponent implements OnInit {

  missions: Mission[];

  constructor(private crfService: CrfService,
              private pegassLoginService: PegassLoginService) {
  }

  ngOnInit() {
  }

  timeSlotForm = new FormGroup({
    'startDate': new FormControl(new Date()),
    'endDate': new FormControl(new Date())
  });

  get startDate() {
    return this.timeSlotForm.get('startDate');
  }

  get endDate() {
    return this.timeSlotForm.get('endDate');
  }

  getMissions() {
    this.pegassLoginService.onPegassLogin()
      .subscribe(login => this.loadMissions(login));
    this.pegassLoginService.login();
  }

  private loadMissions(login: PegassLogin) {
    this.crfService.loadAllMissions(login, this.startDate.value, this.endDate.value)
      .subscribe(missions => this.missions = missions);
  }


}
