import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneralModule } from './general/general.module';
import { MaterialModule } from './general/material/material.module';
import { SecurityRoutingModule } from './security/security-routing.module';
import { SecurityModule } from './security/security.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, GeneralModule, AppRoutingModule, SecurityRoutingModule, BrowserAnimationsModule, SecurityModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
