import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {PegassLogin} from '../model/PegassLogin';
import {Volunteer} from '../model/Volunteer';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrfService {

  constructor(private http: HttpClient) {
  }

  loadAllVolunteerTrainings(pegassLogin: PegassLogin): Observable<Volunteer[]> {
    return this.http.post<Volunteer[]>(environment.baseUrl + '/volunteer/trainings', pegassLogin);
  }
}
