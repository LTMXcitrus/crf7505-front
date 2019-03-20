import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrfService {

  constructor(private http: HttpClient) {
  }

  loadAllVolunteerTrainings() {
    return this.http.get(environment.baseUrl + '/volunteer/trainings');
  }
}
