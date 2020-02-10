import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './room/room.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { RoomsComponent } from './rooms/rooms.component';

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
export class RoomsRoutingModule {}
