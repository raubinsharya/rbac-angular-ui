import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserGridComponent } from './user-grid/user-grid.component';
import { HomeComponent } from './home/home.component';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffect } from './store/effects/user.effect';
import { StoreModule } from '@ngrx/store';
import { usersReducer } from './store/reducers/users.reducer';
import { ViewRolesComponent } from './user-grid/custom-cells/view-roles/view-roles.component';
import { ViewPermissionsComponent } from './user-grid/custom-cells/view-permissions/view-permissions.component';

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
    EffectsModule.forFeature([UsersEffect]),
    StoreModule.forFeature('users', usersReducer),
  ],
})
export class UsersModule {}
