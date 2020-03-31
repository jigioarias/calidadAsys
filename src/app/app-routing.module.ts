import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsModule } from './clients/clients.module';
import { HomeComponent } from './general/home/home.component';
import { InventoryModule } from './inventory/inventory.module';
import { ItemsModule } from './items/items.module';
import { ReportsModule } from './reports/reports.module';
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
        loadChildren: () => InventoryModule
      },
      {
        path: '',
        loadChildren: () => UsersModule
      },
      {
        path: '',
        loadChildren: () => ItemsModule
      },
      {
        path: '',
        loadChildren: () => ReportsModule
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
