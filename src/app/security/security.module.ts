import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorInterceptor } from '../general/errors/shared/error.interceptor';
import { MaterialModule } from '../general/material/material.module';
import { LoginComponent } from './login/login.component';
import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security/security.component';

@NgModule({
  declarations: [LoginComponent, SecurityComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, SecurityRoutingModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  exports: [LoginComponent]
})
export class SecurityModule {}
