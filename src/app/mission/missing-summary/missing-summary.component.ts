import {Component, Input, OnInit} from '@angular/core';
import {Mission} from "../../model/Mission";
import {TranslateRolePipe} from "../../translate-role.pipe";

@Component({
  selector: 'app-missing-summary',
  templateUrl: './missing-summary.component.html',
  styleUrls: ['./missing-summary.component.css']
})
export class MissingSummaryComponent implements OnInit {

  @Input() mission: Mission;

  completeWithComments: boolean;
  completeWithModifiedHours: boolean;

  constructor() { }

  ngOnInit() {
    this.completeWithComments = this.mission.missingRoles.length === 0 && this.mission.hasCommentedInscriptions;
    this.completeWithModifiedHours = this.mission.missingRoles.length === 0 && this.mission.hasModifiedHoursInscriptions;
  }

  missingSummary(): string {
    const pipe = new TranslateRolePipe()
    if(this.mission.missingRoles.length !== 0) {
      return 'Manque ' + this.mission.missingRoles
        .map(missingRole => missingRole.quantity + ' ' + pipe.transform(missingRole.type))
        .join(', ');
    }
    // if(mission.hasCommentedInscriptions && mission.hasModifiedHoursInscriptions) {
    //   return 'Complet - commentaires + horaires modifiés'
    // }
    // if(mission.hasCommentedInscriptions) {
    //   return 'Complet - commentaires'
    // }
    // return 'Complet - horaires modifiés'
  }

}
