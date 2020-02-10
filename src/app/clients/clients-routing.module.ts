import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsComponent } from './clients/clients.component';

const routes: Routes = [
  {
    path: 'client',
    component: ClientsComponent,
    children: [
      {
        path: 'list',
        component: ClientsListComponent
      },
      {
        path: ':id',
        component: ClientComponent
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {}
