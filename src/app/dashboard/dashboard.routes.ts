import { Routes } from '@angular/router';
import { ResumenComponent } from './resumen/resumen.component';
import { PuertasComponent } from './puertas/puertas.component';

export const DASHBOARD_ROUTES: Routes = [
  { path: '', redirectTo: 'resumen', pathMatch: 'full' },
  { path: 'resumen', component: ResumenComponent },
  { path: 'puertas', component: PuertasComponent }
];
