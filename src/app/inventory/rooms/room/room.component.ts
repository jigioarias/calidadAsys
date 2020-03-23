import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Item } from 'src/app/items/shared/item';
import { ItemService } from 'src/app/items/shared/item.service';
import { RoomState } from '../../shared/room';

@Component({
  selector: 'ho-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  roomForm: FormGroup;
  itemInRoomForm: FormGroup;
  items: Observable<Item[]>;

  constructor(private formBuilder: FormBuilder, private itemService: ItemService) {}

  ngOnInit() {
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
      roomType_uuid: [null, Validators.required],
      items: [null],
      comforts: [null],
      state: [RoomState.DISPONIBLE]
    });

    this.itemInRoomForm = this.formBuilder.group({
      item: [null, Validators.required],
      quantity: [1, Validators.required],
      requireCheck: [true, Validators.required]
    });
  }

  guardar() {
    console.log('guardar');
  }
}
