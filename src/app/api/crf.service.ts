import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {PegassLogin} from '../model/PegassLogin';
import {VolunteerTraining} from '../model/VolunteerTraining';
import {Observable} from 'rxjs';
import {Volunteer} from '../model/Volunteer';
import {CrfMail} from '../model/CrfMail';
import {Activities} from "../model/Activities";
import {DispoResponse, DispoSearch} from "../covid/covid.component";

@Injectable({
  providedIn: 'root'
})
export class CrfService {

  constructor(private http: HttpClient) {
  }

  loadAllVolunteerTrainings(pegassLogin: PegassLogin): Observable<VolunteerTraining[]> {
    return this.http.post<VolunteerTraining[]>(environment.baseUrl + '/volunteer/trainings', pegassLogin);
  }

  loadAllMissions(pegassLogin: PegassLogin, start: string, end: string, addedDaysForLocalMissions: number): Observable<Activities> {
    const body = {
      username: pegassLogin.username,
      password: pegassLogin.password
    };
    return this.http.post<Activities>(`${environment.baseUrl}/mission/activities?start=${start}&end=${end}&addedDaysForLocalMissions=${addedDaysForLocalMissions}`, body);
  }

  generateMails(activities: Activities, subject: string, header: string, footer: string, respMission: string): Observable<CrfMail[]> {
    const body = {
      header: header,
      footer: footer,
      subject: subject,
      respMission: respMission,
      activities: activities
    };
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

  getDispos() {
    return this.http.get<DispoResponse>(`${environment.baseUrl}/covid/dispos`)
  }

  searchDispos(search: DispoSearch) {
    return this.http.post<DispoResponse>(`${environment.baseUrl}/covid/dispos`, search);
  }
}
