import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './room/room.component';

const routesRooms: Routes = [
  {
    path: 'room',
    component: RoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routesRooms)],
  exports: [RouterModule]
})
export class RoomsRoutingModule {}
