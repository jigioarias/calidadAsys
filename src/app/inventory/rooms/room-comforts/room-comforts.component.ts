import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Comfort, COMFORTS } from '../../shared/comforts';

@Component({
  selector: 'ho-room-comforts',
  templateUrl: './room-comforts.component.html',
  styleUrls: ['./room-comforts.component.scss']
})
export class RoomComfortsComponent implements OnInit {
  comfortsToSelect: Comfort[];
  comfortsSelected: string[] = [];

  @Output()
  comforts = new EventEmitter<string[]>();

  constructor() {}

  ngOnInit() {
    this.comfortsToSelect = COMFORTS;
  }

  onSelect(comfort) {
    this.comfortsSelected = this.comfortsSelected.filter((c) => c !== comfort.code);
    if (comfort.selected) {
      this.comfortsSelected.push(comfort.code);
    }
    this.comforts.emit(this.comfortsSelected);
  }
}
