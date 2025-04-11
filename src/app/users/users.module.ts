import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserGridComponent } from './user-grid/user-grid.component';
import { HomeComponent } from './home/home.component';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffect } from './store/effects/user.effect';
import { StoreModule } from '@ngrx/store';
import { ViewRolesComponent } from './user-grid/custom-cells/view-roles/view-roles.component';
import { ViewPermissionsComponent } from './user-grid/custom-cells/view-permissions/view-permissions.component';
import { usersRootreducers } from './store/reducers';
import { UsersRolesEffect } from './store/effects/roles.effect';
import { UsersPermissionsEffect } from './store/effects/permissoins.effect';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  declarations: [
    HomeComponent,
    UserGridComponent,
    ViewRolesComponent,
    ViewPermissionsComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    NgxPermissionsModule.forChild(),
    EffectsModule.forFeature([
      UsersEffect,
      UsersRolesEffect,
      UsersPermissionsEffect,
    ]),
    StoreModule.forFeature('users', usersRootreducers),
  ],
})
export class UsersModule {}
