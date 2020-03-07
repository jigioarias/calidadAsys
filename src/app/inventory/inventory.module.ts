import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../general/material/material.module';
import { InventoryRoutingModule } from './inventory-routing.module';
import { RoomComponent } from './rooms/room/room.component';
import { RoomsListComponent } from './rooms/rooms-list/rooms-list.component';
import { RoomsComponent } from './rooms/rooms/rooms.component';

@NgModule({
  declarations: [RoomsComponent, RoomComponent, RoomsListComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, InventoryRoutingModule]
})
export class InventoryModule {}
