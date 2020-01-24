import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients/clients.component';
import { HomeComponent } from './general/home/home.component';
import { RoomsComponent } from './inventory/rooms/rooms/rooms.component';
import { LoginComponent } from './security/login/login.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'rooms',
    component: RoomsComponent
  },
  {
    path: 'clients',
    component: ClientsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
