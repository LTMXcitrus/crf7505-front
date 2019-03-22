import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-pegass-login-dialog',
  templateUrl: './pegass-login-dialog.component.html',
  styleUrls: ['./pegass-login-dialog.component.css']
})
export class PegassLoginDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PegassLoginDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.data.username = '';
    this.data.password = '';
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
