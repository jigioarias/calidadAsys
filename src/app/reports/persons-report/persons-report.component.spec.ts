import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsReportComponent } from './persons-report.component';

describe('PersonsReportComponent', () => {
  let component: PersonsReportComponent;
  let fixture: ComponentFixture<PersonsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
