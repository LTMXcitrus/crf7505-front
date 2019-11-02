import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Mission} from "../../../model/Mission";

@Component({
  selector: 'app-delete-mission-confirmation',
  templateUrl: './delete-mission-confirmation.component.html',
  styleUrls: ['./delete-mission-confirmation.component.css']
})
export class DeleteMissionConfirmationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteMissionConfirmationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Mission) { }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
