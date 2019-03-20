import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  private logger = new Subject<boolean>();
  private loggedIn = false;

  isLoggedInAsObservable(): Observable<boolean> {
    return this.logger.asObservable();
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(username: string, password: string) {
    return this.http.post<any>(environment.baseUrl + '/login', {username, password}, {observe: 'response'})
      .pipe(map(response => {
        const token = response.headers.get('Authorization');
        // login successful if there's a jwt token in the response
        if (token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(token));
          this.setLoginState(true);
        }
        this.setLoginState(true);
        return token;
      }));
  }

  logout() {
    // remove user from local storage to log user out
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

}
