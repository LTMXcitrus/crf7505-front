import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-mail-editor',
  templateUrl: './dialog-mail-editor.component.html',
  styleUrls: ['./dialog-mail-editor.component.css']
})
export class DialogMailEditorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogMailEditorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
