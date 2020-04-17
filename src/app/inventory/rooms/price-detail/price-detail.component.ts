import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
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

  constructor(private formBuilder: FormBuilder) {}

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
    }
  }

  validatePriceDetail(priceDetail: PriceDetail): boolean {
    if (priceDetail.day === null || !this.hasPriceInfo(priceDetail)) {
      const mensaje =
        'Para definir un precio <b>personalizado</b>, debe definir por lo menos para que día aplicará y un precio por día u hora.';
      this.showFailMessage(mensaje);
      return false;
    }
    return false;
  }
  s;

  showFailMessage(mensaje: string) {
    Swal.fire({
      html: mensaje,
      icon: 'error'
    });
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
