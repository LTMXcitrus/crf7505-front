import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {PegassLogin} from '../model/PegassLogin';
import {VolunteerTraining} from '../model/VolunteerTraining';
import {Observable} from 'rxjs';
import {Volunteer} from '../model/Volunteer';
import {CrfMail} from '../model/CrfMail';
import {Mission} from '../model/Mission';

@Injectable({
  providedIn: 'root'
})
export class CrfService {

  constructor(private http: HttpClient) {
  }

  loadAllVolunteerTrainings(pegassLogin: PegassLogin): Observable<VolunteerTraining[]> {
    return this.http.post<VolunteerTraining[]>(environment.baseUrl + '/volunteer/trainings', pegassLogin);
  }

  loadAllMissions(pegassLogin: PegassLogin, start: string, end: string): Observable<Mission[]> {
    const body = {
      username: pegassLogin.username,
      password: pegassLogin.password
    };
    return this.http.post<Mission[]>( `${environment.baseUrl}/mission/activities?start=${start}&end=${end}`, body);
  }

  generateMails(missions: Mission[], header: string, footer: string): Observable<CrfMail[]> {
    const body = {
      header: header,
      footer: footer,
      missions: missions
    }
    return this.http.post<CrfMail[]>(`${environment.baseUrl}/mission/recapMissions`, body);
  }

  retrieveVolunteers(): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(`${environment.baseUrl}/volunteer/`);
  }

  saveVolunteer(volunteer: Volunteer): Observable<Volunteer> {
    return this.http.post<Volunteer>(`${environment.baseUrl}/volunteer/`, volunteer);

  }

  removeVolunteer(volunteer: Volunteer): Observable<boolean> {
    return this.http.post<boolean>(`${environment.baseUrl}/volunteer/remove`, volunteer);
  }

  sendRecap(crfMails: CrfMail[]): Observable<boolean> {
    return this.http.post<boolean>(`${environment.baseUrl}/mission/sendRecap`, crfMails);
  }
}
