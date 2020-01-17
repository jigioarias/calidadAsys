import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ClientsModule } from './clients/clients.module';
import { GeneralModule } from './general/general.module';
import { MaterialModule } from './general/material/material.module';
import { RoomsModule } from './inventory/rooms/rooms.module';
import { SecurityModule } from './security/security.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, GeneralModule, BrowserAnimationsModule, RoomsModule, ClientsModule, SecurityModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
