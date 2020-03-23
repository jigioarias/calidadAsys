import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../general/material/material.module';
import { AddItemsComponent } from './add-items/add-items.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items/items.component';
import { EditItemComponent } from './edit-item/edit-item.component';

@NgModule({
  declarations: [ItemsComponent, AddItemsComponent, ItemsListComponent, EditItemComponent],
  imports: [CommonModule, ReactiveFormsModule, ItemsRoutingModule, MaterialModule]
})
export class ItemsModule {}
