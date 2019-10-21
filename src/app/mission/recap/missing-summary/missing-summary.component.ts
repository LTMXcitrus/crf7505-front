import {Component, Input, OnInit} from '@angular/core';
import {Mission} from "../../../model/Mission";
import {TranslateRolePipe} from "../../../translate-role.pipe";
import {MatDialog} from "@angular/material";
import {EditMissingRolesDialogComponent} from "../edit-missing-roles-dialog/edit-missing-roles-dialog.component";

@Component({
  selector: 'app-missing-summary',
  templateUrl: './missing-summary.component.html',
  styleUrls: ['./missing-summary.component.css']
})
export class MissingSummaryComponent implements OnInit {

  @Input() mission: Mission;

  completeWithComments: boolean;
  completeWithModifiedHours: boolean;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.completeWithComments = this.mission.missingRoles.length === 0 && this.mission.hasCommentedInscriptions;
    this.completeWithModifiedHours = this.mission.missingRoles.length === 0 && this.mission.hasModifiedHoursInscriptions;
  }

  missingSummary(): string {
    const pipe = new TranslateRolePipe()
    if (this.mission.missingRoles.length !== 0) {
      return 'Manque ' + this.mission.missingRoles
        .map(missingRole => missingRole.quantity + ' ' + pipe.transform(missingRole.type))
        .join(', ');
    }
  }

  editMissingRoles() {
    const dialogRef = this.dialog.open(EditMissingRolesDialogComponent, {data: {missingRoles: this.mission.missingRoles}});
    dialogRef.afterClosed().subscribe((data) => {
      this.mission.missingRoles = data.missingRoles;
    })
  }
}
