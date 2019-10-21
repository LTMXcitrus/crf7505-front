import {Component, Input, OnInit} from '@angular/core';
import {Volunteer} from "../../../model/Volunteer";
import {RoleType} from "../../../model/RoleType";

@Component({
  selector: 'app-volunteer-form',
  templateUrl: './volunteer-form.component.html',
  styleUrls: ['./volunteer-form.component.css']
})
export class VolunteerFormComponent implements OnInit {

  @Input() volunteer: Volunteer;

  possibleRoles: RoleType[] = [
    RoleType.PARTICIPANT,
    RoleType.PSC1,
    RoleType.PSE1,
    RoleType.PSE2,
    RoleType.CH_VPSP,
    RoleType.CI
  ];

  constructor() {
  }

  ngOnInit() {

  }
}
