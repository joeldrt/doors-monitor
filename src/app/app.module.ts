import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

// Services
import { RegistrosService } from './_services/registros.service';
import { AuthGuard } from './_guard/auth.guard';

// Layouts for both dashboard and landing-page
import { DashboardUiModule } from './dashboard/_ui/ui.module';

// Pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResumenComponent } from './dashboard/resumen/resumen.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { WelcomeComponent } from './landing-page/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ResumenComponent,
    LandingPageComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DashboardUiModule
  ],
  providers: [
    RegistrosService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
