import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesRoutingModule } from './roles-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RoleGridComponent } from './roles-grid/role-grid.component';
import { ViewPermissionsComponent } from './roles-grid/custom-cells/view-permissions/view-permissions.component';
import { RolesEffect } from './store/effects/roles.effect';
import { rolesRootreducers } from './store/reducers';
import { RolesPermissionsEffect } from './store/effects/permissions.effect';

@NgModule({
  declarations: [HomeComponent, RoleGridComponent, ViewPermissionsComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    SharedModule,
    EffectsModule.forFeature([RolesEffect, RolesPermissionsEffect]),
    StoreModule.forFeature('roles', rolesRootreducers),
  ],
})
export class RolesModule {}
