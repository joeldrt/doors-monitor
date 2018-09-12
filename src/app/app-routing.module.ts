import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DASHBOARD_ROUTES } from './dashboard/dashboard.routes';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LANDING_PAGE_ROUTES } from './landing-page/landing-page.routes';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/resumen', pathMatch: 'full' },
  { path: '', canActivate: [AuthGuard], component: DashboardComponent, children: DASHBOARD_ROUTES },
  { path: '', component: LandingPageComponent, children: LANDING_PAGE_ROUTES }
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
