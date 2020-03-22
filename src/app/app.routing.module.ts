import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {AuthGuard} from './auth.guard';
import {FormatComponent} from './format/format.component';
import {MissionComponent} from './mission/mission.component';
import {MotComponent} from './mot/mot.component';
import {CovidComponent} from "./covid/covid.component";

const routes: Routes = [
  {path: '', component: CovidComponent},//component: HomepageComponent},
  {path: 'format', component: FormatComponent, canActivate: [AuthGuard]},
  {path: 'mission', component: MissionComponent, canActivate: [AuthGuard]},
  {path: 'mot', component: MotComponent, canActivate: [AuthGuard]}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
