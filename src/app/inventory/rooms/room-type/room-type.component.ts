import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { PriceDetail, RoomType } from '../../shared/room';
import { RoomService } from '../../shared/room.service';
import { PriceDetailComponent } from '../price-detail/price-detail.component';

@Component({
  selector: 'ho-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.scss']
})
export class RoomTypeComponent implements OnInit {
  roomTypeForm: FormGroup;
  dataSource: MatTableDataSource<PriceDetail>;
  displayedColumns: string[] = ['day', 'priceDay', 'priceHour', 'startTime', 'endTime', 'holiday', 'remove'];

  priceDetailVisible = false;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private roomService: RoomService) {}

  ngOnInit() {
    this.roomTypeForm = this.formBuilder.group({
      uuid: [null],
      description: [null, Validators.required],
      priceDay: [null, Validators.required],
      priceHour: [null, Validators.required]
    });
  }

  removePriceDetail(priceDetail: PriceDetail) {}

  openDialog(): void {
    console.log('open dialog');

    const dialogRef = this.dialog.open(PriceDetailComponent, {
      // width: '250px',
      data: null
    });

    // const dialogRef = this.dialog.open(PriceDetailComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  save() {
    if (!this.roomTypeForm.valid) {
      return;
    }

    const roomType: RoomType = this.getInfoRoomType();
    this.roomService.addType(roomType);
  }

  getInfoRoomType(): RoomType {
    const valuesRoom = this.roomTypeForm.value;
    return {
      uuid: valuesRoom.uuid,
      description: valuesRoom.description,
      priceDay: valuesRoom.priceDay,
      priceHour: valuesRoom.priceHour,
      priceDetails: null
    } as RoomType;
  }

  showPriceDetail() {
    this.priceDetailVisible = true;
  }

  setPriceDetail(priceDetail: PriceDetail) {
    this.priceDetailVisible = false;
  }

  hasCustomPrices(): boolean {
    return this.dataSource && this.dataSource.data.length > 0;
  }
}
