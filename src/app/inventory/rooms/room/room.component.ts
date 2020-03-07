import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomState } from '../../shared/room';

@Component({
  selector: 'ho-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  roomForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.roomForm = this.formBuilder.group({
      uuid: [null],
      id: [null, Validators.required],
      description: [null],
      floor: [null],
      area: [null],
      maxPersons: [2, Validators.required],
      noBeds: [1, Validators.required],
      freeParking: [false, Validators.required],
      roomType_uuid: [null, Validators.required],
      items: [null],
      comforts: [null],
      state: [RoomState.DISPONIBLE]
    });
  }

  guardar() {
    console.log('guardar');
  }
}
