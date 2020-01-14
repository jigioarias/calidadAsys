import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../general/material/material.module';
import { ClientComponent } from './client/client.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients/clients.component';

@NgModule({
  declarations: [ClientsComponent, ClientComponent],
  imports: [CommonModule, ClientsRoutingModule, ReactiveFormsModule, MaterialModule]
})
export class ClientsModule {}
