import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsModule } from './clients/clients.module';
import { HomeComponent } from './general/home/home.component';
import { RoomsModule } from './inventory/rooms/rooms.module';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';

const routes: Routes = [
  {
    path: 'app',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () => ClientsModule
      },
      {
        path: '',
        loadChildren: () => RoomsModule
      },
      {
        path: '',
        loadChildren: () => UsersModule
      },
      {
        path: '',
        loadChildren: () => ItemsModule
      }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
