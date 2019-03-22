import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Volunteer} from '../model/Volunteer';
import {Training} from '../model/Training';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-recycle-status',
  templateUrl: './recycle-status.component.html',
  styleUrls: ['./recycle-status.component.css']
})
export class RecycleStatusComponent implements OnInit {

  @Input() volunteers: Volunteer[];
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource(this.volunteers);

  displayedColumns: string[] = ['firstname', 'id', 'trainings'];

  constructor() {
  }

  ngOnInit() {
    const trainings = [
      new Training('obtenu', 'à recycler le', 'FIAPS', 'Initiateur premiers secours'),
      new Training('obtenu', 'à recycle le', 'PSE2', 'EQUIPIER SECOURISTE')
    ];
    this.volunteers = [new Volunteer('1', 'Matthieu', 'Lemonnier', trainings), new Volunteer('2', 'Emmanuel', 'Logak', trainings)];
    this.dataSource = new MatTableDataSource<Volunteer>(this.volunteers);
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
