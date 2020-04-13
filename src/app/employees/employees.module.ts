import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../general/material/material.module';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees/employees.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';

@NgModule({
  declarations: [EmployeesComponent, ListEmployeesComponent, EmployeeComponent],
  imports: [CommonModule, ReactiveFormsModule, EmployeesRoutingModule, MaterialModule]
})
export class EmployeesModule {}
