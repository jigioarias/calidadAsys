import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients/clients.component';
import { HomeComponent } from './general/home/home.component';
import { RoomsComponent } from './inventory/rooms/rooms/rooms.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'rooms',
    component: RoomsComponent
  },
  {
    path: 'clients',
    component: ClientsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
