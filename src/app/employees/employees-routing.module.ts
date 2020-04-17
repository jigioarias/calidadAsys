import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesComponent } from './employees/employees.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';

const routes: Routes = [
  {
    path: 'employees',
    component: EmployeesComponent,
    children: [
      {
        path: 'add',
        component: EmployeeComponent
      },
      {
        path: 'list',
        component: ListEmployeesComponent
      },

      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {}
