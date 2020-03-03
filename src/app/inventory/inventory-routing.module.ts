import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './rooms/room/room.component';
import { RoomsListComponent } from './rooms/rooms-list/rooms-list.component';
import { RoomsComponent } from './rooms/rooms/rooms.component';

const routes: Routes = [
  {
    path: 'rooms',
    component: RoomsComponent,
    children: [
      {
        path: 'list',
        component: RoomsListComponent
      },
      {
        path: ':id',
        component: RoomComponent
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule {}
