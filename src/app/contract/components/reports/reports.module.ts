import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { ReportsHomeComponent } from './components/home/home.component';
import { StoreModule } from '@ngrx/store';
import { contractReportFeatureReducers } from './store/reducers/index.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ContractReportEffect } from './store/effects/contract-report.effect';

@NgModule({
  declarations: [ReportsHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRoutingModule,
    StoreModule.forFeature(
      'contractReportFeature',
      contractReportFeatureReducers
    ),
    EffectsModule.forFeature([ContractReportEffect]),
  ],
})
export class ReportsModule {}
