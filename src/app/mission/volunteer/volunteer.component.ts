import {Component, OnInit} from '@angular/core';
import {CrfService} from "../../api/crf.service";
import {Volunteer} from "../../model/Volunteer";
import {MatDialog} from "@angular/material";
import {AddVolunteerComponent} from "../add-volunteer/add-volunteer.component";
import {DeleteConfirmationComponent} from "../delete-confirmation/delete-confirmation.component";
import {EditVolunteerComponent} from "../edit-volunteer/edit-volunteer.component";

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit {

  volunteers: Volunteer[];

  constructor(private crfService: CrfService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.crfService.retrieveVolunteers().subscribe(volunteers => this.volunteers = volunteers)
  }

  addVolunteer() {
    const dialogRef = this.dialog.open(AddVolunteerComponent);
    dialogRef.afterClosed().subscribe(volunteer => {
      if (volunteer) {
        this.saveVolunteer(volunteer)
      }
    })
  }

  remove(volunteer: Volunteer) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {data: volunteer})
    dialogRef.afterClosed().subscribe(volunteer => {
      if (volunteer) {
        this.crfService.removeVolunteer(volunteer).subscribe(() => this.volunteers = this.volunteers.filter(v => v !== volunteer))
      }
    })
  }


  private saveVolunteer(volunteer: Volunteer) {
    this.crfService.saveVolunteer(volunteer).subscribe(volunteer => this.volunteers.push(volunteer))
  }

  edit(volunteer: Volunteer) {
    const dialogRef = this.dialog.open(EditVolunteerComponent, {
      data: volunteer
    })
    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.editVolunteer(data)
      }
    })
  }

  private editVolunteer(volunteer: any) {
    this.crfService.saveVolunteer(volunteer).subscribe(volunteer => {
      this.volunteers = this.volunteers.filter(v => v.emailAddress !== volunteer.emailAddress)
      this.volunteers.push(volunteer)
    })
  }
}
