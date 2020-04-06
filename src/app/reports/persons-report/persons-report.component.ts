import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/general/reports/ExcelService';
import { Fecha } from 'src/app/general/shared/fecha';
import { Hotel } from 'src/app/general/shared/hotel';
import { HotelService } from 'src/app/general/shared/hotel.service';
import { Person } from 'src/app/persons/shared/person';
import { PersonService } from 'src/app/persons/shared/person.service';
import { isNull } from 'util';
import { ReportService } from '../shared/report.service';

const ELEMENT_DATA: Person[] = [];

@Component({
  selector: 'ho-persons-report',
  templateUrl: './persons-report.component.html',
  styleUrls: ['./persons-report.component.scss'],
})
export class PersonsReportComponent implements OnInit {
  date = new FormControl(new Date());
  reportFilter: FormGroup;
  fechaInicial: any;
  fechaFinal: any;
  hotel: Hotel;

  showReport: boolean;

  displayedColumns: string[] = ['document', 'firstName', 'lastName', 'phone', 'email', 'country'];
  dataSource = ELEMENT_DATA;
  nationality: string = 'ALL';
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private excelService: ExcelService,
    private hotelService: HotelService
  ) {}

  ngOnInit() {
    this.fechaInicial = new Date();
    this.fechaFinal = new Date();
    this.hotelService.find().subscribe((data) => {
      this.hotel = data;
      console.log('hotel>>>>', this.hotel.name);
    });

    this.reportFilter = this.formBuilder.group({
      endDate: [null, Validators.required],
      initialDate: [null, Validators.required],
      nationality: [null, Validators.required],
    });
    this.fechaFinal = Fecha.DateToYYYYMMDD(this.fechaFinal);
    this.fechaInicial = Fecha.DateToYYYYMMDD(this.fechaInicial);
    this.personService.listSale(this.nationality, this.fechaInicial, this.fechaFinal).subscribe((data) => {
      this.dataSource = data;
      if (this.dataSource.length > 0) {
        this.showReport = true;
      }
    });
  }

  onSubmit() {
    this.fechaFinal = Fecha.DateToYYYYMMDD(this.fechaFinal);
    this.fechaInicial = Fecha.DateToYYYYMMDD(this.fechaInicial);

    if (!isNull(this.fechaFinal && !isNull(this.fechaInicial))) {
      this.personService.listSale(this.nationality, this.fechaInicial, this.fechaFinal).subscribe((data) => {
        this.dataSource = data;
        if (!isNull(this.dataSource) && this.dataSource.length > 0) {
          this.showReport = true;
        } else {
          this.showReport = false;
        }
      });
    }
  }

  exportAsXLSX(): void {
    const fechaExport = new Date();

    this.router.navigate([
      '/' +
        this.excelService.exportAsExcelFileRoute(
          ReportService.convertPersonToMigration(this.dataSource, this.hotel),
          'clientes' + fechaExport,
          'personsReport'
        ),
    ]);
  }
}
