import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comfort } from '../../shared/comforts';

@Component({
  selector: 'ho-room-comfort',
  templateUrl: './room-comfort.component.html',
  styleUrls: ['./room-comfort.component.scss']
})
export class RoomComfortComponent implements OnInit {
  @Input() comfort: Comfort;
  active = false;

  @Output()
  selected = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  selectComfort() {
    this.active = !this.active;
    this.selected.emit({ code: this.comfort.code, selected: this.active });
  }
}
