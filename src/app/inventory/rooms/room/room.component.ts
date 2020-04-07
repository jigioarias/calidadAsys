import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { Item } from 'src/app/items/shared/item';
import { ItemService } from 'src/app/items/shared/item.service';
import { ItemInRoom, RoomState, RoomType } from '../../shared/room';

@Component({
  selector: 'ho-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  roomForm: FormGroup;
  itemInRoomForm: FormGroup;
  items: Observable<Item[]>;
  displayedColumns: string[] = ['item', 'quantity', 'requireCheck', 'remove'];
  itemsInRoom: ItemInRoom[] = [];
  dataSource: MatTableDataSource<ItemInRoom>;

  types: RoomType[];

  constructor(private formBuilder: FormBuilder, private itemService: ItemService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.itemsInRoom);

    this.types = [
      {
        uuid: 'uuid1',
        description: 'Tipo1',
        priceDay: 100,
        priceHour: 10,
      },
      {
        uuid: 'uuid2',
        description: 'Tipo2',
        priceDay: 200,
        priceHour: 20,
      },
    ];
    this.items = this.itemService.list();

    this.roomForm = this.formBuilder.group({
      uuid: [null],
      id: [null, Validators.required],
      description: [null],
      floor: [1],
      area: [null],
      maxPersons: [2, Validators.required],
      noBeds: [1, Validators.required],
      freeParking: [false, Validators.required],
      roomType: [null, Validators.required],
      items: [null],
      comforts: [null],
      state: [RoomState.DISPONIBLE],
    });

    this.itemInRoomForm = this.formBuilder.group({
      item: [null, Validators.required],
      quantity: [1, Validators.required],
      requireCheck: [true, Validators.required],
    });
  }

  guardar() {
    console.log('guardar');
  }

  getItemDescription(item: Item) {
    // return item.description;
    // return 'Item';
    return item ? item.description : '';
  }

  getRoomTypeDescription(roomType: RoomType) {
    // return item.description;
    // return 'Item';
    return roomType ? roomType.description : '';
  }

  addItem() {
    if (!this.itemInRoomForm.valid) {
      return;
    }

    if (this.existItemInList()) {
      const controlItem = this.itemInRoomForm.get('item');
      controlItem.setErrors({ itemAreadyExist: true });
    } else {
      const itemInRoom: ItemInRoom = this.createItemInRoom();
      this.dataSource.data.push(itemInRoom);
      this.dataSource.filter = '';
      this.resetItemInRoomForm();
    }
  }

  resetItemInRoomForm() {
    this.itemInRoomForm.reset(
      {
        item: null,
        quantity: 1,
        requireCheck: true,
      },
      { emitEvent: false }
    );
  }

  private existItemInList() {
    const itemsInList = this.dataSource.data;
    const uuidItemToAdd = this.itemInRoomForm.value.item.uuid;
    const existItemInList = itemsInList.find((item) => uuidItemToAdd == item.item_uuid);
    return existItemInList;
  }

  private createItemInRoom(): ItemInRoom {
    return {
      item_uuid: this.itemInRoomForm.value.item.uuid,
      description: this.itemInRoomForm.value.item.description,
      quantity: this.itemInRoomForm.value.quantity,
      requireCheck: this.itemInRoomForm.value.requireCheck,
    } as ItemInRoom;
  }

  getControl(controlName: string): AbstractControl {
    return this.itemInRoomForm.get(controlName);
  }

  removeItem(itemInRoom: ItemInRoom) {
    console.log('borra => ', itemInRoom);

    this.dataSource.data = this.dataSource.data.filter((item) => item.item_uuid != itemInRoom.item_uuid);
    // this.dataSource.filter = '';
  }
}
