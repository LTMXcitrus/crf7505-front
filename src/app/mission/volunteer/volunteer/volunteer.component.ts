import {Component, OnInit} from '@angular/core';
import {CrfService} from '../../../api/crf.service';
import {Volunteer} from '../../../model/Volunteer';
import {MatDialog} from '@angular/material';
import {AddVolunteerComponent} from '../add-volunteer/add-volunteer.component';
import {DeleteConfirmationComponent} from '../delete-confirmation/delete-confirmation.component';
import {EditVolunteerComponent} from '../edit-volunteer/edit-volunteer.component';
import {DialogSpinnerComponent} from '../../../dialog-spinner/dialog-spinner.component';
import {TranslateRolePipe} from "../../../translate-role.pipe";

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit {
  private rolePipe: TranslateRolePipe = new TranslateRolePipe();

  volunteers: Volunteer[];
  filteredVolunteers: Volunteer[] = [];
  search = "";

  constructor(private crfService: CrfService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.load();
  }

  addVolunteer() {
    const dialogRef = this.dialog.open(AddVolunteerComponent);
    dialogRef.afterClosed().subscribe(volunteer => {
      if (volunteer) {
        this.saveVolunteer(volunteer);
      }
    });
  }

  remove(volunteer: Volunteer) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {data: volunteer});
    dialogRef.afterClosed().subscribe(volunteer => {
      if (volunteer) {
        this.crfService.removeVolunteer(volunteer).subscribe(() => this.volunteers = this.volunteers.filter(v => v !== volunteer));
      }
    });
  }


  private saveVolunteer(volunteer: Volunteer) {
    this.crfService.saveVolunteer(volunteer).subscribe(volunteer => this.volunteers.push(volunteer));
  }

  edit(volunteer: Volunteer) {
    const dialogRef = this.dialog.open(EditVolunteerComponent, {
      data: volunteer
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log(data);
        this.editVolunteer(data);
      }
    });
  }

  private editVolunteer(volunteer: any) {
    this.crfService.saveVolunteer(volunteer).subscribe(volunteer => {
      this.volunteers = this.volunteers.filter(v => v.emailAddress !== volunteer.emailAddress);
      this.volunteers.push(volunteer);
    });
  }

  interestedInString(volunteer: Volunteer) {
    if (volunteer.interestedIn && volunteer.interestedIn.length > 0) {
      return volunteer.interestedIn
        .map(role => this.rolePipe.transform(role))
        .join(', ')
    }
    return `rôles par défault pour ${this.rolePipe.transform(volunteer.role)}`
  }

  load() {
    const spinnerRef = this.dialog.open(DialogSpinnerComponent)
    this.crfService.retrieveVolunteers().subscribe(volunteers => {
      this.volunteers = volunteers.sort(this.compareVolunteer);
      this.filteredVolunteers = volunteers.sort(this.compareVolunteer);
      spinnerRef.close();
    });
  }

  filterVolunteer() {
    if (!this.search || this.search.length === 0) {
      this.filteredVolunteers = this.volunteers;
    } else {
      this.filteredVolunteers = this.volunteers.filter(volunteer => {
        return this.searchTerms(volunteer).toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase()) !== -1
      }).sort(this.compareVolunteer);
    }
  }

  searchTerms(volunteer: Volunteer) {
    return (volunteer.lastname + " " + volunteer.firstname)
      + (volunteer.firstname + " " + volunteer.lastname)
      + (" " +volunteer.emailAddress)
  }

  compareVolunteer = (a, b) => (a.firstname > b.firstname) ? 1 : -1;

}
