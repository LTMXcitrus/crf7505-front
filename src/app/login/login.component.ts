import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<LoginComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.data.username = '';
    this.data.password = '';
    this.data.accountCreation = false;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  switchAccountCreation() {
    this.data.accountCreation = true;
    this.data.confirmPassword = '';
  }

}
