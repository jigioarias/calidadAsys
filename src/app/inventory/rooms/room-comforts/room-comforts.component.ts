import { Component, OnInit } from '@angular/core';
import { Comfort, COMFORTS } from '../../shared/comforts';

@Component({
  selector: 'ho-room-comforts',
  templateUrl: './room-comforts.component.html',
  styleUrls: ['./room-comforts.component.scss']
})
export class RoomComfortsComponent implements OnInit {
  comforts: Comfort[];

  constructor() {}

  ngOnInit() {
    this.comforts = COMFORTS;
  }
}
