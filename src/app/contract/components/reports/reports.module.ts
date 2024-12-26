import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { ReportsHomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [ReportsHomeComponent],
  imports: [CommonModule, SharedModule, ReportsRoutingModule],
})
export class ReportsModule {}
