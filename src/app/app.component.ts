import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSidenav, MatSnackBar} from '@angular/material';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Creuf 7505';
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  isLoggedIn = false;

  connectedUser: {sub: string, userStructure};

  constructor(private authService: AuthService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.isLoggedInAsObservable().subscribe(result => {
      this.isLoggedIn = result;
      this.connectedUser = this.authService.getConnectedUser();
    });
    this.connectedUser = this.authService.getConnectedUser();
  }

  openLoginDialog() {
    this.authService.openLoginDialog();
  }

  logout() {
    this.authService.logout();
  }
}
