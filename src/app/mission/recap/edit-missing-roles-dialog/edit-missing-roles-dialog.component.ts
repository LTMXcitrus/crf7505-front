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

  missingRoles: Role[];

  constructor(public dialogRef: MatDialogRef<EditMissingRolesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { missingRoles: Role[] }) {
  }

  ngOnInit() {
    this.missingRoles = this.data.missingRoles.map(role => Object.assign({}, role));
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  remove(roleToRemove: Role) {
    this.missingRoles = this.missingRoles.filter(role => role !== roleToRemove);
  }

  addRole() {
    const existingRole = this.missingRoles.find(role => role.type === this.roleToAdd.type);
    if(existingRole) {
      existingRole.quantity = existingRole.quantity + this.roleToAdd.quantity;
    } else {
      this.missingRoles.push(this.roleToAdd)
    }
    this.roleToAdd = new Role(RoleType.PARTICIPANT, 1);
  }

  roleAlreadyPresent(role: string): boolean {
    return this.missingRoles.filter(r => r.type.toString() === role).length !== 0;
  }
}
