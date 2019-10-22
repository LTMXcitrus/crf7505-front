import {Injectable} from '@angular/core';
import {PegassLogin} from './model/PegassLogin';
import {MatDialog} from '@angular/material';
import {PegassLoginDialogComponent} from './pegass-login-dialog/pegass-login-dialog.component';
import {Observable, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PegassLoginService {
  private loginKey = "pegass-login";
  private passwordKey = "pegass-password";

  private logger = new Subject<PegassLogin>();

  constructor(private dialog: MatDialog) {
  }

  onPegassLogin(): Observable<PegassLogin> {
    return this.logger.asObservable();
  }

  login(): Promise<PegassLogin> {
    return new Promise(resolve => {
      const pegassLogin = this.retrievePegassLogin()
      if (pegassLogin) {
        resolve(pegassLogin);
      } else {
        const dialogRef = this.dialog.open(PegassLoginDialogComponent, {
          data: {
            username: '',
            password: ''
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.storePegassLogin(result)
            resolve(result);
          }
        });
      }
    });
  }

  wrongLogin() {
    this.removePegassLogin();
  }

  retrievePegassLogin(): PegassLogin {
    const login = localStorage.getItem(this.loginKey)
    const pwd = localStorage.getItem(this.passwordKey)
    if(login && pwd) {
      return new PegassLogin(login, pwd);
    }
    return undefined;
  }

  storePegassLogin(pegassLogin: PegassLogin) {
    localStorage.setItem(this.loginKey, pegassLogin.username);
    localStorage.setItem(this.passwordKey, pegassLogin.password);
  }

  removePegassLogin() {
    localStorage.removeItem(this.loginKey);
    localStorage.removeItem(this.passwordKey);
  }
}
