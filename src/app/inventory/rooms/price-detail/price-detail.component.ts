import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Messages } from 'src/app/general/messages';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { PriceDetail } from '../../shared/room';

@Component({
  selector: 'ho-price-detail',
  templateUrl: './price-detail.component.html',
  styleUrls: ['./price-detail.component.scss']
})
export class PriceDetailComponent implements OnInit {
  priceDetailForm: FormGroup;
  days: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  @Output() valueChange = new EventEmitter<PriceDetail>();

  constructor(private formBuilder: FormBuilder, private messagesService: MessagesService) {}

  ngOnInit() {
    this.priceDetailForm = this.formBuilder.group({
      day: [null, Validators.required],
      priceDay: [null],
      priceHour: [null],
      startTime: [null],
      endTime: [null],
      holiday: [false]
    });
  }

  save() {
    const priceDetail: PriceDetail = this.priceDetailForm.value;
    if (this.validatePriceDetail(priceDetail)) {
      this.emitPriceDetail(priceDetail);
    }
  }

  validatePriceDetail(priceDetail: PriceDetail): boolean {
    if (priceDetail.day === null || !this.hasPriceInfo(priceDetail)) {
      this.messagesService.showErrorMessage(Messages.get('priceDetail_info_incomplete'));
      return false;
    }
    return true;
  }

  hasHourInfo(priceDetail: PriceDetail): boolean {
    return priceDetail.startTime !== null && priceDetail.endTime !== null;
  }

  hasPriceInfo(priceDetail: PriceDetail): boolean {
    return priceDetail.priceDay !== null || priceDetail.endTime !== null;
  }

  close() {
    this.emitPriceDetail(null);
  }

  emitPriceDetail(priceDetail: PriceDetail) {
    this.valueChange.emit(priceDetail);
  }
}
