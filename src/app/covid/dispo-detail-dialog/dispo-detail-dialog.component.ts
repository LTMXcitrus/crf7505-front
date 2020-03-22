import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Dispo} from "../covid.component";

@Component({
  selector: 'app-dispo-detail-dialog',
  templateUrl: './dispo-detail-dialog.component.html',
  styleUrls: ['./dispo-detail-dialog.component.css']
})
export class DispoDetailDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DispoDetailDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Dispo) { }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
