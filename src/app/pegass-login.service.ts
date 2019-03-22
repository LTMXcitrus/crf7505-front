import {Injectable} from '@angular/core';
import {PegassLogin} from './model/PegassLogin';
import {MatDialog} from '@angular/material';
import {PegassLoginDialogComponent} from './pegass-login-dialog/pegass-login-dialog.component';
import {Observable, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PegassLoginService {

  private pegassLogin: PegassLogin;

  constructor(private dialog: MatDialog) {
  }

  getPegassLogin(): Observable<PegassLogin> {
    const logger = new Subject<PegassLogin>();
    if (this.pegassLogin) {
      logger.next(this.pegassLogin);
    } else {
      const dialogRef = this.dialog.open(PegassLoginDialogComponent, {
        data: {
          username: '',
          password: ''
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.pegassLogin = result;
          logger.next(this.pegassLogin);
        }
      });
    }
    return logger.asObservable();
  }
}
