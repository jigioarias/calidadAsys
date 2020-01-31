import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsModule } from './clients/clients.module';
import { HomeComponent } from './general/home/home.component';

const routes: Routes = [
  {
    path: 'app',
    component: HomeComponent,
    children: [
      {
        path: 'client',
        loadChildren: () => ClientsModule
        // component: ClientsComponent
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
