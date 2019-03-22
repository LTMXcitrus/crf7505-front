import {Component, OnInit} from '@angular/core';
import {CrfService} from '../api/crf.service';
import {MatDialog} from '@angular/material';
import {DialogSpinnerComponent} from '../dialog-spinner/dialog-spinner.component';
import {PegassLogin} from '../model/PegassLogin';
import {PegassLoginService} from '../pegass-login.service';
import {Volunteer} from '../model/Volunteer';

@Component({
  selector: 'app-format',
  templateUrl: './format.component.html',
  styleUrls: ['./format.component.css']
})
export class FormatComponent implements OnInit {

  private volunteers: Volunteer[];

  constructor(private crfService: CrfService,
              private pegassLoginService: PegassLoginService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.pegassLoginService.getPegassLogin().subscribe(pegassLogin => {
      this.loadVolunteerTrainings(pegassLogin);
    });
  }

  loadVolunteerTrainings(pegassLogin: PegassLogin) {
    const dialogRef = this.dialog.open(DialogSpinnerComponent);
    this.crfService.loadAllVolunteerTrainings(pegassLogin)
      .subscribe(successResponse => {
          this.volunteers = successResponse;
          dialogRef.close();
        },
        () => dialogRef.close());
  }

}
