import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

export const LANDING_PAGE_ROUTES: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent }
];
