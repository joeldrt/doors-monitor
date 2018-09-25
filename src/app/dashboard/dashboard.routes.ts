import { Routes } from '@angular/router';
import { ResumenComponent } from './resumen/resumen.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { ConfiguracionComplejosComponent } from './configuracion-complejos/configuracion-complejos.component';
import { ConfiguracionComplejosDetalleComponent } from './configuracion-complejos-detalle/configuracion-complejos-detalle.component';
import { ConfiguracionHabitacionesComponent } from './configuracion-habitaciones/configuracion-habitaciones.component';
import {
  ConfiguracionHabitacionesDetalleComponent
} from './configuracion-habitaciones-detalle/configuracion-habitaciones-detalle.component';
import { ConfiguracionSensoresComponent } from './configuracion-sensores/configuracion-sensores.component';
import { ConfiguracionSensoresDetalleComponent } from './configuracion-sensores-detalle/configuracion-sensores-detalle.component';


export const DASHBOARD_ROUTES: Routes = [
  {path: '', redirectTo: 'resumen', pathMatch: 'full'},
  {path: 'resumen', component: ResumenComponent},
  {path: 'configuracion', component: ConfiguracionComponent},
  {path: 'configuracion/complejos', component: ConfiguracionComplejosComponent},
  {path: 'configuracion/complejos/:complejo_id', component: ConfiguracionComplejosDetalleComponent},
  {path: 'configuracion/habitaciones', component: ConfiguracionHabitacionesComponent},
  {path: 'configuracion/habitaciones/:habitacion_id', component: ConfiguracionHabitacionesDetalleComponent},
  {path: 'configuracion/sensores', component: ConfiguracionSensoresComponent},
  {path: 'configuracion/sensores/:sensor_id', component: ConfiguracionSensoresDetalleComponent},
];
