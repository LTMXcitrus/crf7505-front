import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSidenav, MatSnackBar} from '@angular/material';
import {LoginComponent} from './login/login.component';
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

  constructor(private authService: AuthService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.isLoggedInAsObservable().subscribe(result => {
      this.isLoggedIn = result;
    });
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      data: {
        username: '',
        password: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.accountCreation) {
          this.createAccount(result);
        } else {
          this.login(result);
        }
      }
    });
  }

  private login(loginData: any) {
    this.authService.login(loginData.username, loginData.password).subscribe(result => console.log(result));
    this.snackBar.open('Hello ' + loginData.username, null, {
      duration: 2000,
    });
  }

  private createAccount(accountCreationData: any) {
    this.authService.signUp(accountCreationData.username, accountCreationData.password).subscribe(result => console.log(result));
  }
}
