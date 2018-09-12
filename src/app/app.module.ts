import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

// Services
import { RegistrosService } from './_services/registros.service';
import { AuthGuard } from './_guard/auth.guard';

// Layout
import { UiModule } from './ui/ui.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    UiModule
  ],
  providers: [
    RegistrosService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
