import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Role} from "../../../model/Role";
import {RoleType} from "../../../model/RoleType";

@Component({
  selector: 'app-edit-missing-roles-dialog',
  templateUrl: './edit-missing-roles-dialog.component.html',
  styleUrls: ['./edit-missing-roles-dialog.component.css']
})
export class EditMissingRolesDialogComponent implements OnInit {
  roleTypeEnum = RoleType;
  possibleRoles = Object.keys(RoleType);
  roleToAdd: Role = new Role(RoleType.PARTICIPANT, 1);
  partialRoleToAdd = new Role(RoleType.PARTICIPANT, 1);

  completeMissingRoles: Role[];
  partialMissingRoles: Role[];

  constructor(public dialogRef: MatDialogRef<EditMissingRolesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { missingRoles: Role[] }) {
  }

  ngOnInit() {
    this.completeMissingRoles = this.data.missingRoles
      .filter(role => !role.beginDate && !role.endDate)
      .map(role => Object.assign({}, role));
    this.partialMissingRoles = this.data.missingRoles
      .filter(role => role.beginDate || role.endDate)
      .map(role => Object.assign({}, role));
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  remove(roleToRemove: Role) {
    this.completeMissingRoles = this.completeMissingRoles.filter(role => role !== roleToRemove);
  }

  addRole() {
    const existingRole = this.completeMissingRoles.find(role => role.type === this.roleToAdd.type);
    if (existingRole) {
      existingRole.quantity = existingRole.quantity + this.roleToAdd.quantity;
    } else {
      this.completeMissingRoles.push(this.roleToAdd)
    }
    this.roleToAdd = new Role(RoleType.PARTICIPANT, 1);
  }

  addPartialRole() {

    this.partialMissingRoles.push(this.partialRoleToAdd);

    this.partialRoleToAdd = new Role(RoleType.PARTICIPANT, 1);
  }

  roleAlreadyPresent(role: string): boolean {
    return this.completeMissingRoles.filter(r => r.type.toString() === role).length !== 0;
  }
}
