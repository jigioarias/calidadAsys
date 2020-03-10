import { Component, Input, OnInit } from '@angular/core';
import { Comfort } from '../../shared/comforts';

@Component({
  selector: 'ho-room-comfort',
  templateUrl: './room-comfort.component.html',
  styleUrls: ['./room-comfort.component.scss']
})
export class RoomComfortComponent implements OnInit {
  @Input() comfort: Comfort;
  active = false;

  constructor() {}

  ngOnInit() {}

  activeComfort() {
    this.active = !this.active;
  }
}
