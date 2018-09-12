import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_guard/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent }
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
