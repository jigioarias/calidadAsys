import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoomComponent } from './room/room.component';
import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms/rooms.component';

@NgModule({
  declarations: [RoomsComponent, RoomComponent],
  imports: [CommonModule, RoomsRoutingModule]
})
export class RoomsModule {}
