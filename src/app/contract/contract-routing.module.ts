import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractHomeComponent } from './components/home/home.component';
import { ContractOverviewMainComponent } from './components/overview/main/main.component';
import { ContractDuelistGridComponent } from './components/duelist/duelistgrid/duelistgrid.component';

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
        path: 'overview',
        component: ContractOverviewMainComponent,
        data: { breadcrumb: 'Overview' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractRoutingModule {}
