import {Component, OnInit} from '@angular/core';
import {CrfService} from '../api/crf.service';

@Component({
  selector: 'app-format',
  templateUrl: './format.component.html',
  styleUrls: ['./format.component.css']
})
export class FormatComponent implements OnInit {

  private trainings: string;

  constructor(private crfService: CrfService) {
  }

  ngOnInit() {
    this.loadVolunteerTrainings();
  }

  loadVolunteerTrainings() {
    this.crfService.loadAllVolunteerTrainings().subscribe(result => this.trainings = JSON.stringify(result));
  }

}
