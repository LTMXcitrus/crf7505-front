import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Volunteer} from "../../../model/Volunteer";
import {RoleType} from "../../../model/RoleType";

@Component({
  selector: 'app-add-volunteer',
  templateUrl: './add-volunteer.component.html',
  styleUrls: ['./add-volunteer.component.css']
})
export class AddVolunteerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddVolunteerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Volunteer) { }

  ngOnInit() {
    this.data = new Volunteer("", "", RoleType.PARTICIPANT, "", [])
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
