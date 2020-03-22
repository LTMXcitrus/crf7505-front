import {Component, OnInit} from '@angular/core';
import {CrfService} from "../api/crf.service";
import * as moment from 'moment';

export interface Dispo {
  email: string
  phone: string
  firstname: string
  lastname: string
  ul: string
  vulnerable: string,
  roleInUl: string,
  competences: string[]
  profession: string[]
  uniformeStatus: string
  creneauxRepresentations: string[]
}

export interface DispoResponse {
  dispos: Dispo[]
  date: string
}

export interface DispoSearch {
  competences?: string[];
  firstname?: string;
  ul?: string;
  lastname?: string
  creneau?: {
    date: string,
    start: number,
    end: number
  }
}


@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css']
})
export class CovidComponent implements OnInit {
  displayedColumns: string[] = [
    'email',
    'phone',
    'firstname',
    'lastname',
    'ul',
    //'vulnerable',
    //'roleInUl',
    'competences',
    //'profession',
    //'uniformeStatus',
    'creneauxRepresentations'
  ];
  roles = [
    'Animateur.rice de cours de FLE',
    'Chauffeur VL',
    'Chauffeur VPSP',
    'Chef.fe d\'équipe maraudes',
    'CI',
    'CI Alpha',
    'CI Réseau',
    'Infirmier.e local.e',
    'Logisticien.ne Croix-Rouge',
    'Maraudeur.se',
    'PSC1',
    'PSE1',
    'PSE2',
    'Responsable Permanence Sociale',
    'TSA / Coreg',
    'Nouveau bénévole',
  ];
  uls = [
    'UL 01-02',
    'UL 03-10',
    'UL 04',
    'UL 05',
    'UL 06',
    'UL 07',
    'UL 08',
    'UL 09',
    'UL 11',
    'UL 12',
    'UL 13',
    'UL 14',
    'UL 15',
    'UL 16',
    'UL 17',
    'UL 18',
    'UL 19',
    'UL 20'
  ]
  dataSource: Dispo[] = [];

  mouseOvered = false;

  firstname: string;
  lastname: string;
  ul: string;
  competences: string[];
  date: string;
  start: string;
  end: string;

  constructor(private crfService: CrfService) {
  }

  ngOnInit() {
    this.crfService.getDispos().subscribe(res => this.dataSource = res.dispos);
  }

  showDispoDetails(dispo: Dispo) {
    alert(dispo.firstname)
  }

  search() {
    const search: DispoSearch = {
      "firstname": this.firstname,
      "lastname": this.lastname,
      "ul": this.ul,
      "competences": this.competences === undefined || this.competences.length === 0 ? undefined : this.competences,
      "creneau": this.date ? {
        "start": +this.start,
        "end": +this.end,
        "date": this.date
      } : undefined
    };
    this.crfService.searchDispos(search).subscribe(res => this.dataSource = res.dispos);
  }

}
