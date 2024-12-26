import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsHomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsHomeComponent,
    data: { homeUrl: '/contract/reports' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './components/contract-booking-status/contract-booking-status.component'
          ).then((c) => c.ContractBookingStatusComponent),
        data: { breadcrumb: 'Booking Status', show: false },
      },
      {
        path: 'booking-status',
        loadComponent: () =>
          import(
            './components/contract-booking-status/contract-booking-status.component'
          ).then((c) => c.ContractBookingStatusComponent),
        data: { breadcrumb: 'Booking Status' },
      },
      {
        path: 'error-report',
        loadComponent: () =>
          import(
            './components/contract-error-report/contract-error-report.component'
          ).then((c) => c.ContractErrorReportComponent),
        data: { breadcrumb: 'Error Report' },
      },
      {
        path: 'change-log',
        loadComponent: () =>
          import(
            './components/contract-change-log/contract-change-log.component'
          ).then((c) => c.ContractChangeLogComponent),
        data: { breadcrumb: 'Change Log' },
      },
      {
        path: 'admin-report',
        loadComponent: () =>
          import(
            './components/contract-admin-report/contract-admin-report.component'
          ).then((c) => c.ContractAdminReportComponent),
        data: { breadcrumb: 'Admin Report' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
