import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {environment} from '../environments/environment';
import * as jwt_decode from 'jwt-decode';
import {LoginComponent} from "./login/login.component";
import {MatDialog, MatSnackBar} from "@angular/material";
import * as moment from "moment";

export const JWT_TOKEN_NAME = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logger = new Subject<boolean>();
  private loggedIn = false;

  constructor(private http: HttpClient,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
    if (this.isTokenExpired()) {
      this.openLoginDialog()
    }
  }

  isLoggedInAsObservable(): Observable<boolean> {
    return this.logger.asObservable();
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(username: string, password: string): Observable<string> {
    localStorage.removeItem('currentUser');
    return this.http.post<any>(environment.baseUrl + '/login', {username, password}, {observe: 'response'})
      .pipe(map(response => {
        const token = response.headers.get('Authorization');
        // login successful if there's a jwt token in the response
        if (token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.setToken(token);
          this.setLoginState(true);
        }
        this.setLoginState(true);
        return token;
      }));
  }

  private getToken(): string {
    return localStorage.getItem(JWT_TOKEN_NAME);
  }

  private setToken(token: string): void {
    localStorage.setItem(JWT_TOKEN_NAME, token);
  }

  private getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode<{ exp: number }>(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }
    const tokenExpirationDate = this.getTokenExpirationDate(token);
    if (tokenExpirationDate === undefined) return false;
    return !(tokenExpirationDate.valueOf() > moment().add(1, 'year').toDate().valueOf());
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.setLoginState(false);
  }

  signUp(username: string, password: string) {
    return this.http.post<any>(environment.baseUrl + '/users/sign-up', {username, password});
  }

  private setLoginState(state: boolean) {
    this.logger.next(state);
    this.loggedIn = state;
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      data: {
        username: '',
        password: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.accountCreation) {
          this.createAccount(result);
        } else {
          this.log_in(result);
        }
      }
    });
  }

  private log_in(loginData: any) {
    this.login(loginData.username, loginData.password).subscribe(result => console.log(result));
    this.snackBar.open('Hello ' + loginData.username, null, {
      duration: 2000,
    });
  }

  private createAccount(accountCreationData: any) {
    this.signUp(accountCreationData.username, accountCreationData.password).subscribe(result => console.log(result));
  }

}
