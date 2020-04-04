import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExcelService } from 'src/app/general/reports/ExcelService';
import { Fecha } from 'src/app/general/shared/fecha';
import { Sale } from 'src/app/sales/shared/sale';
import { SaleService } from 'src/app/sales/shared/sale.service';
import { isNull } from 'util';

const ELEMENT_DATA: Sale[] = [];

@Component({
  selector: 'ho-sales-reports',
  templateUrl: './sales-reports.component.html',
  styleUrls: ['./sales-reports.component.scss'],
})
export class SalesReportsComponent implements OnInit {
  date = new FormControl(new Date());
  reportFilter: FormGroup;
  fechaInicial: any;
  fechaFinal: any;
  nationality: string;

  showReport: boolean;

  displayedColumns: string[] = ['client', 'gross', 'discount', 'tax', 'total', 'date'];
  dataSource = ELEMENT_DATA;

  constructor(private formBuilder: FormBuilder, private saleService: SaleService, private excelService: ExcelService) {}

  ngOnInit() {
    this.fechaInicial = new Date();
    this.fechaFinal = new Date();
    this.nationality = 'ALL';

    this.reportFilter = this.formBuilder.group({
      endDate: [null, Validators.required],
      initialDate: [null, Validators.required],
    });

    this.fechaInicial = Fecha.DateToYYYYMMDD(this.fechaInicial);
    this.fechaFinal = Fecha.DateToYYYYMMDD(this.fechaFinal);

    this.saleService.list(this.nationality, this.fechaInicial, this.fechaFinal).subscribe((data) => {
      console.log(data);
      this.dataSource = data;
      if (!isNull(this.dataSource) && this.dataSource.length > 0) {
        this.showReport = true;
      }
    });
  }

  onSubmit() {
    let fechaInit = Fecha.DateToYYYYMMDD(this.fechaInicial);
    let fechaFin = Fecha.DateToYYYYMMDD(this.fechaFinal);

    if (!isNull(this.fechaFinal && !isNull(this.fechaInicial))) {
      this.saleService.list(this.nationality, fechaInit, fechaFin).subscribe((data) => {
        console.log(data);
        this.dataSource = data;
        if (this.dataSource.length > 0) {
          this.showReport = true;
        }
      });
    }
  }

  exportAsXLSX(): void {
    const fechaExport = new Date();
    this.excelService.exportAsExcelFile(this.dataSource, 'ventas' + fechaExport);
  }
}
