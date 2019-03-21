import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {HomepageComponent} from './homepage/homepage.component';
import {FormatComponent} from './format/format.component';
import {MissionComponent} from './mission/mission.component';
import {MotComponent} from './mot/mot.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {JwtInterceptor} from './jwt.interceptor';
import {AppRoutingModule} from './app.routing.module';
import {AppMaterialModule} from './material/app.material.module';
import { DialogSpinnerComponent } from './dialog-spinner/dialog-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    FormatComponent,
    MissionComponent,
    MotComponent,
    DialogSpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, DialogSpinnerComponent]
})
export class AppModule {
}
