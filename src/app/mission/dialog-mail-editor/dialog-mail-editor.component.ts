import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-mail-editor',
  templateUrl: './dialog-mail-editor.component.html',
  styleUrls: ['./dialog-mail-editor.component.css']
})
export class DialogMailEditorComponent implements OnInit {

  header: string;
  footer: string;
  subject: string;

  constructor(public dialogRef: MatDialogRef<DialogMailEditorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {header: string, footer: string, subject: string}) { }

  ngOnInit() {
    this.header = this.data.header;
    this.footer = this.data.footer;
    this.subject = this.data.subject;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
