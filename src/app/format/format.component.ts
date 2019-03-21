import {Component, OnInit} from '@angular/core';
import {CrfService} from '../api/crf.service';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../login/login.component';
import {DialogSpinnerComponent} from '../dialog-spinner/dialog-spinner.component';

@Component({
  selector: 'app-format',
  templateUrl: './format.component.html',
  styleUrls: ['./format.component.css']
})
export class FormatComponent implements OnInit {

  private trainings: string;

  constructor(private crfService: CrfService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadVolunteerTrainings();
  }

  loadVolunteerTrainings() {
    const dialogRef = this.dialog.open(DialogSpinnerComponent);
    this.crfService.loadAllVolunteerTrainings()
      .subscribe(successResponse => {
          this.trainings = JSON.stringify(successResponse);
          dialogRef.close();
        },
        () => dialogRef.close());
  }

}
