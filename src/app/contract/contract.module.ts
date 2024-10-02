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
import { ContractOverviewPartnersComponent } from './components/overview/partners/partners.component';
import { ContractItemDetailsComponent } from './components/overview/item-details/item-details.component';
import { BuildAndUpdateEffect } from './store/effects/build-update.effects';
import { GridTextCellRendererComponent } from './components/overview/item-details/grid/text-cell-renderer/text-cell-renderer.component';
import { GridItemNumberRendererComponent } from './components/overview/item-details/grid/item-number-renderer/item-number-renderer.component';

@NgModule({
  declarations: [
    ContractDuelistGridComponent,
    ContractHomeComponent,
    HyperlinkcellrenderComponent,
    BasicValcheckDialogComponent,
    ContractOverviewMainComponent,
    ContractOverviewHeaderComponent,
    ContractOverviewPartnersComponent,
    ContractItemDetailsComponent,
    GridTextCellRendererComponent,
    GridItemNumberRendererComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContractRoutingModule,
    StoreModule.forFeature('contractFeature', contractFeatureReducers),
    EffectsModule.forFeature([
      DueListEffects,
      ContractOverViewEffect,
      BuildAndUpdateEffect,
    ]),
  ],
  providers: [ContractService],
})
export class ContractModule {}
