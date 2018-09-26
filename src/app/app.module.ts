import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

// JWT support
import { JwtInterceptor } from './_jwt/jwt.interceptor';

// Services
import { RegistrosService } from './_services/registros.service';
import { AuthGuard } from './_guard/auth.guard';
import { AuthenticationService } from './_services/authentication.service';
import { ComplejoService } from './_services/complejo.service';
import { HabitacionesService } from './_services/habitaciones.service';
import { SensoresService } from './_services/sensores.service';

// Toaster module
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Layout for dashboard
import { DashboardUiModule } from './dashboard/_ui/ui.module';

// Pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResumenComponent } from './dashboard/resumen/resumen.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { WelcomeComponent } from './landing-page/welcome/welcome.component';
import { LoginComponent } from './landing-page/login/login.component';
import { ConfiguracionComponent } from './dashboard/configuracion/configuracion.component';
import { ConfiguracionComplejosComponent } from './dashboard/configuracion-complejos/configuracion-complejos.component';
import {
  ConfiguracionComplejosDetalleComponent
} from './dashboard/configuracion-complejos-detalle/configuracion-complejos-detalle.component';
import { ConfiguracionHabitacionesComponent } from './dashboard/configuracion-habitaciones/configuracion-habitaciones.component';
import {
  ConfiguracionHabitacionesDetalleComponent
} from './dashboard/configuracion-habitaciones-detalle/configuracion-habitaciones-detalle.component';
import { ConfiguracionSensoresComponent } from './dashboard/configuracion-sensores/configuracion-sensores.component';
import { ConfiguracionSensoresDetalleComponent } from './dashboard/configuracion-sensores-detalle/configuracion-sensores-detalle.component';
import { ResumenComplejoComponent } from './dashboard/resumen-complejo/resumen-complejo.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ResumenComponent,
    LandingPageComponent,
    WelcomeComponent,
    LoginComponent,
    ConfiguracionComponent,
    ConfiguracionComplejosComponent,
    ConfiguracionComplejosDetalleComponent,
    ConfiguracionHabitacionesComponent,
    ConfiguracionHabitacionesDetalleComponent,
    ConfiguracionSensoresComponent,
    ConfiguracionSensoresDetalleComponent,
    ResumenComplejoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DashboardUiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3690,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    })
  ],
  providers: [
    RegistrosService,
    AuthenticationService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    DatePipe,
    ComplejoService,
    HabitacionesService,
    SensoresService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
