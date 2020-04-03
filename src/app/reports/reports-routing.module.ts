import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonsReportComponent } from './persons-report/persons-report.component';
import { ReportsComponent } from './reports/reports.component';
import { SalesReportsComponent } from './sales-reports/sales-reports.component';

const routes: Routes = [
  {
    path: 'reports',
    component: ReportsComponent,
    children: [
      {
        path: 'personsReport',
        component: PersonsReportComponent
      },
      {
        path: 'salesReport',
        component: SalesReportsComponent
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
