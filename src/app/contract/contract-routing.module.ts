import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractHomeComponent } from './components/home/home.component';
import { ContractOverviewMainComponent } from './components/overview/main/main.component';
import { ContractDuelistGridComponent } from './components/duelist/duelistgrid/duelistgrid.component';
import { ContractItemDetailsMainComponent } from './components/item-detail/main/main.component';
import { ngxPermissionsGuard } from 'ngx-permissions';
import { PermissionsGuardWithRoles } from '../guards/role-permission.guard';
import { DevelopmentProgressComponent } from './components/reports/shared/components/development-progress/development-progress.component';

const routes: Routes = [
  {
    path: '',
    component: ContractHomeComponent,
    data: { breadcrumb: 'Home', icon: 'home' },
    children: [
      {
        path: '',
        component: ContractDuelistGridComponent,
        data: { breadcrumb: '', show: false },
      },
      {
        path: 'overview/:source',
        data: { breadcrumb: 'Contract Overview' },
        children: [
          {
            path: '',
            component: ContractOverviewMainComponent,
            data: { breadcrumb: '', show: false },
          },
          {
            path: ':idx',
            component: ContractItemDetailsMainComponent,
            // canActivate: [PermissionsGuardWithRoles],
            data: {
              breadcrumb: 'Item Detail',
              permissions: {
                only: ['system_admin_it_NL90'],
                redirectTo: '/unauthorized',
              },
            },
          },
        ],
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./components/reports/reports.module').then(
            (m) => m.ReportsModule
          ),
      },
      {
        path: 'booked-contract',
        component: DevelopmentProgressComponent,
      },
      {
        path: 'change-contract',
        component: DevelopmentProgressComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractRoutingModule {}
