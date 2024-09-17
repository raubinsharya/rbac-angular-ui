import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { contractFeatureReducers } from './store/reducers/index.reducer';
import { DueListEffects } from './store/effects/duelist.effects';
import { ContractDuelistGridComponent } from './components/duelist/duelistgrid/duelistgrid.component';
import { ContractService } from './services/contract.service';
import { ContractHomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { HyperlinkcellrenderComponent } from './components/duelist/duelistgrid/custom-cell/hyperlinkcellrender/hyperlinkcellrender.component';
import { BasicValcheckDialogComponent } from './components/duelist/basic-valcheck-dialog/basic-valcheck-dialog.component';
import { ContractOverviewMainComponent } from './components/overview/main/main.component';
import { ContractOverViewEffect } from './store/effects/contract-overview.effects';
import { ContractOverviewHeaderComponent } from './components/overview/header/header.component';

@NgModule({
  declarations: [
    ContractDuelistGridComponent,
    ContractHomeComponent,
    HyperlinkcellrenderComponent,
    BasicValcheckDialogComponent,
    ContractOverviewMainComponent,
    ContractOverviewHeaderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContractRoutingModule,
    StoreModule.forFeature('contractFeature', contractFeatureReducers),
    EffectsModule.forFeature([DueListEffects, ContractOverViewEffect]),
  ],
  providers: [ContractService],
})
export class ContractModule {}
