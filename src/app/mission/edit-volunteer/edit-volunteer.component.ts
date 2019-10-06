import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Volunteer} from "../../model/Volunteer";

@Component({
  selector: 'app-update-volunteer',
  templateUrl: './edit-volunteer.component.html',
  styleUrls: ['./edit-volunteer.component.css']
})
export class EditVolunteerComponent implements OnInit {

  volunteer: Volunteer;

  constructor(public dialogRef: MatDialogRef<EditVolunteerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Volunteer) { }

  ngOnInit() {
    this.volunteer = {...this.data}
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
