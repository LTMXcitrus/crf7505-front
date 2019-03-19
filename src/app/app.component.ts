import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSidenav, MatSnackBar} from '@angular/material';
import {LoginComponent} from './login/login.component';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Creuf 7505';
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  private isLoggedIn = false;

  constructor(private authService: AuthService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(result => this.isLoggedIn = result);
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
      data: {
        username: '',
        password: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.snackBar.open('Hello ' + result.username, null, {
        duration: 2000,
      });
    });
  }
}
