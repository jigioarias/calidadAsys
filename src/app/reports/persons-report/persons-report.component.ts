import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/persons/shared/person';
import { PersonService } from 'src/app/persons/shared/person.service';

const ELEMENT_DATA: Person[] = [];

@Component({
  selector: 'ho-persons-report',
  templateUrl: './persons-report.component.html',
  styleUrls: ['./persons-report.component.scss']
})
export class PersonsReportComponent implements OnInit {
  reportFilter: FormGroup;
  fechaInicial: string;
  fechaFinal: string;
  nationality: string;

  showReport: boolean;

  displayedColumns: string[] = ['name', 'country'];
  dataSource = ELEMENT_DATA;

  constructor(private formBuilder: FormBuilder, private personService: PersonService) {}

  ngOnInit() {
    this.reportFilter = this.formBuilder.group({
      endDate: [null, Validators.required],
      initialDate: [null, Validators.required]
    });

    this.fechaInicial = '2020-03-01T08:00';
    this.fechaFinal = '2020-04-01T08:001';
    this.nationality = 'OUTSIDE';
    this.personService.listSale(this.nationality, this.fechaInicial, this.fechaFinal).subscribe(data => {
      console.log(data);
      this.dataSource = data;
    });

    if (this.dataSource.length > 0) {
      this.showReport = true;
    } else {
      this.showReport = false;
    }
  }

  onSubmit() {
    this.fechaInicial = this.reportFilter.get('initialDate').value;
    this.fechaFinal = this.reportFilter.get('endDate').value;
    this.personService.listSale(this.nationality, this.fechaInicial, this.fechaFinal).subscribe(data => {
      console.log(data);
      this.dataSource = data;
    });

    if (this.dataSource.length > 0) {
      this.showReport = true;
    } else {
      this.showReport = false;
    }
  }
}
