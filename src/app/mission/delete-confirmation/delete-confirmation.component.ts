import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Volunteer} from "../../model/Volunteer";

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Volunteer) { }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
