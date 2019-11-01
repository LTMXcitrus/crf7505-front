import {Component, Input, OnInit} from '@angular/core';
import {Mission} from "../../../model/Mission";
import {TranslateRolePipe} from "../../../translate-role.pipe";
import {MatDialog} from "@angular/material";
import {EditMissingRolesDialogComponent} from "../edit-missing-roles-dialog/edit-missing-roles-dialog.component";
import {Role} from "../../../model/Role";

@Component({
  selector: 'app-missing-summary',
  templateUrl: './missing-summary.component.html',
  styleUrls: ['./missing-summary.component.css']
})
export class MissingSummaryComponent implements OnInit {
  pipe = new TranslateRolePipe();

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
    if (this.mission.missingRoles.length !== 0) {
      return 'Manque ' + this.missingRolesString();
    }
  }

  private missingRolesString() {
    const partialMissing = this.partialMissingRolesString()
    const completeMissing = this.completeMissingRolesString();

    return partialMissing.concat(completeMissing)
      .filter(roleString => roleString)
      .join(', ')
  }

  editMissingRoles() {
    const dialogRef = this.dialog.open(EditMissingRolesDialogComponent, {data: {missingRoles: this.mission.missingRoles}});
    dialogRef.afterClosed().subscribe((missingRoles) => {
      if (missingRoles) {
        this.mission.missingRoles = missingRoles;
      }
    })
  }

  private completeMissingRolesString(): string[] {
    return this.mission.missingRoles
      .filter(role => !role.beginDate && !role.endDate)
      .map(role => this.completeMissingRoleString(role))
  }

  private completeMissingRoleString(role: Role): string {
    return `${role.quantity} ${this.pipe.transform(role.type)}`
  }

  private partialMissingRolesString(): string[] {
    return this.mission.missingRoles
      .filter(role => role.beginDate || role.endDate)
      .map(role => this.partialMissingRoleString(role))
  }

  private partialMissingRoleString(role: Role): string {
    const begin = this.computeTime(this.mission.beginDate, role.beginDate);
    const end = this.computeTime(this.mission.endDate, role.endDate);
    return `${role.quantity} ${this.pipe.transform(role.type)} (${begin}-${end})`
  }


  private computeTime(actual: string, custom?: string): string {
    if (custom) {
      return custom
    }
    return actual
  }
}
