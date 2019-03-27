import {Component, OnInit} from '@angular/core';
import {CrfService} from '../api/crf.service';
import {MatDialog} from '@angular/material';
import {DialogSpinnerComponent} from '../dialog-spinner/dialog-spinner.component';
import {PegassLogin} from '../model/PegassLogin';
import {PegassLoginService} from '../pegass-login.service';
import {Volunteer} from '../model/Volunteer';
import {Subject} from "rxjs";

@Component({
  selector: 'app-format',
  templateUrl: './format.component.html',
  styleUrls: ['./format.component.css']
})
export class FormatComponent implements OnInit {

  volunteers = new Subject<Volunteer[]>();

  constructor(private crfService: CrfService,
              private pegassLoginService: PegassLoginService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.pegassLoginService.onPegassLogin().subscribe(pegassLogin => {
      this.loadVolunteerTrainings(pegassLogin);
    });
    this.pegassLoginService.login();
  }

  loadVolunteerTrainings(pegassLogin: PegassLogin) {
    const dialogRef = this.dialog.open(DialogSpinnerComponent);
    this.crfService.loadAllVolunteerTrainings(pegassLogin)
      .subscribe(successResponse => {
        this.volunteers.next(successResponse);
          dialogRef.close();
        },
        () => dialogRef.close());
  }

}
