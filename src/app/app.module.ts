import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {RoutingModule} from './routing.module';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { FormatComponent } from './format/format.component';
import { MissionComponent } from './mission/mission.component';
import { MotComponent } from './mot/mot.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    FormatComponent,
    MissionComponent,
    MotComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent]
})
export class AppModule {
}
