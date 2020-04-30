import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../general/material/material.module';
import { YesNoPipe } from '../general/shared/pipes/yes-no.pipe';
import { InventoryRoutingModule } from './inventory-routing.module';
import { AddItemsComponent } from './items/add-items/add-items.component';
import { EditItemComponent } from './items/edit-item/edit-item.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { ItemsComponent } from './items/items/items.component';
import { PriceDetailComponent } from './rooms/price-detail/price-detail.component';
import { RoomComfortComponent } from './rooms/room-comfort/room-comfort.component';
import { RoomComfortsComponent } from './rooms/room-comforts/room-comforts.component';
import { RoomTypeComponent } from './rooms/room-type/room-type.component';
import { RoomComponent } from './rooms/room/room.component';
import { RoomsListComponent } from './rooms/rooms-list/rooms-list.component';
import { RoomsComponent } from './rooms/rooms/rooms.component';
import { PriceDetailsComponent } from './rooms/price-details/price-details.component';
import { RoomTypeListComponent } from './rooms/room-type-list/room-type-list.component';

@NgModule({
  declarations: [
    RoomsComponent,
    RoomComponent,
    RoomsListComponent,
    RoomComfortComponent,
    RoomComfortsComponent,
    ItemsComponent,
    AddItemsComponent,
    ItemsListComponent,
    EditItemComponent,
    YesNoPipe,
    RoomTypeComponent,
    PriceDetailComponent,
    PriceDetailsComponent,
    RoomTypeListComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, InventoryRoutingModule],
  entryComponents: [PriceDetailComponent]
})
export class InventoryModule {}
