import { NgModule } from '@angular/core';
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

// Toaster module
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Layouts for both dashboard and landing-page
import { DashboardUiModule } from './dashboard/_ui/ui.module';

// Pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResumenComponent } from './dashboard/resumen/resumen.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { WelcomeComponent } from './landing-page/welcome/welcome.component';
import { PuertasComponent } from './dashboard/puertas/puertas.component';
import { LoginComponent } from './landing-page/login/login.component';
import { ConfiguracionComponent } from './dashboard/configuracion/configuracion.component';
import { ConfiguracionComplejosComponent } from './dashboard/configuracion-complejos/configuracion-complejos.component';
import {
  ConfiguracionComplejosDetalleComponent
} from './dashboard/configuracion-complejos-detalle/configuracion-complejos-detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ResumenComponent,
    LandingPageComponent,
    WelcomeComponent,
    PuertasComponent,
    LoginComponent,
    ConfiguracionComponent,
    ConfiguracionComplejosComponent,
    ConfiguracionComplejosDetalleComponent
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
      positionClass: 'toast-bottom-right',
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
    ComplejoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
