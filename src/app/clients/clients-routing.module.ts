import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';

const routesRooms: Routes = [
  {
    path: 'client',
    component: ClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routesRooms)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {}
