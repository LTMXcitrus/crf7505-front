import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-spinner',
  templateUrl: './dialog-spinner.component.html',
  styleUrls: ['./dialog-spinner.component.css']
})
export class DialogSpinnerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogSpinnerComponent>,
              @Inject(MAT_DIALOG_DATA) public title: string) { }

  ngOnInit() {
  }

}
