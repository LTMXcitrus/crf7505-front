import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomepageComponent} from './homepage/homepage.component';
import {FormatComponent} from './format/format.component';
import {MissionComponent} from './mission/mission.component';
import {MotComponent} from './mot/mot.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {JwtInterceptor} from './jwt.interceptor';
import {AppRoutingModule} from './app.routing.module';
import {AppMaterialModule} from './material/app.material.module';
import {DialogSpinnerComponent} from './dialog-spinner/dialog-spinner.component';
import {PegassLoginDialogComponent} from './pegass-login-dialog/pegass-login-dialog.component';
import {RecycleStatusComponent} from './format/recycle-status/recycle-status.component';
import {TrainingDetailsComponent} from './format/training-details/training-details.component';
import {RecapComponent} from './mission/recap/recap.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {MissionHoursPipe} from './mission-hours.pipe';
import {DayPipe} from './day.pipe';


export const DATE_FORMAT = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD-MM-YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    FormatComponent,
    MissionComponent,
    MotComponent,
    DialogSpinnerComponent,
    PegassLoginDialogComponent,
    RecycleStatusComponent,
    TrainingDetailsComponent,
    RecapComponent,
    MissionHoursPipe,
    DayPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT}
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, DialogSpinnerComponent, PegassLoginDialogComponent]
})
export class AppModule {
}
