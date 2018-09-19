import { Routes } from '@angular/router';
import { ResumenComponent } from './resumen/resumen.component';
import { PuertasComponent } from './puertas/puertas.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { ConfiguracionComplejosComponent } from './configuracion-complejos/configuracion-complejos.component';
import { ConfiguracionComplejosDetalleComponent } from './configuracion-complejos-detalle/configuracion-complejos-detalle.component';


export const DASHBOARD_ROUTES: Routes = [
  { path: '', redirectTo: 'resumen', pathMatch: 'full' },
  { path: 'resumen', component: ResumenComponent },
  { path: 'puertas', component: PuertasComponent },
  { path: 'configuracion', component: ConfiguracionComponent },
  { path: 'configuracion/complejos', component: ConfiguracionComplejosComponent },
  { path: 'configuracion/complejos/:complejo_id', component: ConfiguracionComplejosDetalleComponent}
];
