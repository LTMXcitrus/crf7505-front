import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {VolunteerTraining} from '../../model/VolunteerTraining';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from "rxjs";

@Component({
  selector: 'app-recycle-status',
  templateUrl: './recycle-status.component.html',
  styleUrls: ['./recycle-status.component.css']
})
export class RecycleStatusComponent implements OnInit {

  @Input() volunteersObservable: Observable<VolunteerTraining[]>;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['firstname', 'upToDate', 'id', 'trainings'];

  constructor() {
  }

  ngOnInit() {
    this.volunteersObservable.subscribe(volunteers => {
      this.dataSource = new MatTableDataSource<VolunteerTraining>(volunteers)
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  see(row) {
    console.log(row)
  }

}
