import {Injectable} from '@angular/core';
import {PegassLogin} from './model/PegassLogin';
import {MatDialog} from '@angular/material';
import {PegassLoginDialogComponent} from './pegass-login-dialog/pegass-login-dialog.component';
import {Observable, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PegassLoginService {

  private logger = new Subject<PegassLogin>();

  private pegassLogin: PegassLogin;

  constructor(private dialog: MatDialog) {
  }

  onPegassLogin(): Observable<PegassLogin> {
    return this.logger.asObservable();
  }

  login(): Promise<PegassLogin> {
    return new Promise(resolve => {
      if (this.pegassLogin) {
        resolve(this.pegassLogin);
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
            resolve(this.pegassLogin);
          }
        });
      }
    });
  }
}
