import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { contractFeatureReducers } from './store/reducers/index.reducer';
import { DueListEffects } from './store/effects/duelist.effects';
import { ContractDuelistGridComponent } from './components/duelist/duelistgrid/duelistgrid.component';
import { ContractService } from './services/contract.service';
import { SharedMaterialModule } from '../material.module';
import { ContractHomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ContractDuelistGridComponent, ContractHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    ContractRoutingModule,
    StoreModule.forFeature('contractFeature', contractFeatureReducers),
    EffectsModule.forFeature([DueListEffects]),
  ],
  providers: [ContractService],
})
export class ContractModule {}
