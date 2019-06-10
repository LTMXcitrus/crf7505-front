import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {PegassLogin} from '../model/PegassLogin';
import {Volunteer} from '../model/Volunteer';
import {Observable} from 'rxjs';
import {Mission} from "../model/Mission";
import {MissionDay} from "../model/MissionDay";

@Injectable({
  providedIn: 'root'
})
export class CrfService {

  constructor(private http: HttpClient) {
  }

  loadAllVolunteerTrainings(pegassLogin: PegassLogin): Observable<Volunteer[]> {
    return this.http.post<Volunteer[]>(environment.baseUrl + '/volunteer/trainings', pegassLogin);
  }

  loadAllMissions(pegassLogin: PegassLogin, start: string, end: string): Observable<MissionDay[]> {
    const body = {
      username: pegassLogin.username,
      password: pegassLogin.password
    };
    return this.http.post<MissionDay[]>( `${environment.baseUrl}/mission/activities?start=${start}&end=${end}`, body);
  }
}
