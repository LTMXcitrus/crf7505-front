import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  private logger = new Subject<boolean>();

  isLoggedIn(): Observable<boolean> {
    return this.logger.asObservable();
  }

  login(username: string, password: string) {
    return this.http.post<any>(`/login`, {username, password})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.logger.next(true);
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.logger.next(false);
  }

  signUp(username: string, password: string) {
    return this.http.post<any>('/users/sign-up', {username, password});
  }

}
