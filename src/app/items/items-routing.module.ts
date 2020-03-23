import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemsComponent } from './add-items/add-items.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsComponent } from './items/items.component';

const routes: Routes = [
  {
    path: 'items',
    component: ItemsComponent,
    children: [
      {
        path: 'add',
        component: AddItemsComponent
      },
      {
        path: 'edit/:id',
        component: EditItemComponent
      },
      {
        path: 'list',
        component: ItemsListComponent
      },

      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule {}
