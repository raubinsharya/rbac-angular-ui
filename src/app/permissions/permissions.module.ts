import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsRoutingModule } from './permissions-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PermissionsEffect } from './store/effects/permissions.effect';
import { permissionsRootreducers } from './store/reducers';
import { PermissionsGridComponent } from './permissions-grid/role-grid.component';
import { ViewPermissionsComponent } from './permissions-grid/custom-cells/view-permissions/view-permissions.component';

@NgModule({
  declarations: [
    HomeComponent,
    PermissionsGridComponent,
    ViewPermissionsComponent,
  ],
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    SharedModule,
    EffectsModule.forFeature([PermissionsEffect]),
    StoreModule.forFeature('permissions', permissionsRootreducers),
  ],
})
export class PermissionsModule {}
