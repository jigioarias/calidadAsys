import { TestBed } from '@angular/core/testing';
import { EmployeeHotelService } from './employeeHotel.service';

describe('EmployeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeHotelService = TestBed.get(EmployeeHotelService);
    expect(service).toBeTruthy();
  });
});
