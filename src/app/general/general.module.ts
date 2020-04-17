import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorsComponent } from './errors/errors/errors.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import { MenuComponent } from './menu/menu.component';
import { AuthInterceptor } from './shared/auth-interceptor';

@NgModule({
  declarations: [DashboardComponent, MenuComponent, HomeComponent, ErrorsComponent],
  imports: [CommonModule, MaterialModule, AppRoutingModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class GeneralModule {}
