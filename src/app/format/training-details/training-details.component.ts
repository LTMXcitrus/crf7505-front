import {Component, Input, OnInit} from '@angular/core';
import {Training} from "../../model/Training";

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.css']
})
export class TrainingDetailsComponent implements OnInit {

  @Input() trainings: Training[];

  constructor() { }

  ngOnInit() {
  }

}
