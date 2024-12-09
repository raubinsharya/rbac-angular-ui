import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userManagementFeatureReducers } from './store/reducers/index.reducer';
import { UserManagementEffects } from './store/effects/user-management.effects';
import { ViewRolesComponent } from './components/user-list/custom-cell/view-roles/view-roles.component';
import { ViewRoleDialogComponent } from './components/view-role-dialog/view-role-dialog.component';
import { AddUserDialogComponent } from './components/add-user-dialog/add-user-dialog.component';
import { UserManagementApiService } from './services/user-management.service';

@NgModule({
  declarations: [
    HomeComponent,
    UserListComponent,
    ViewRolesComponent,
    ViewRoleDialogComponent,
    AddUserDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    StoreModule.forFeature(
      'userManagementFeature',
      userManagementFeatureReducers
    ),
    EffectsModule.forFeature([UserManagementEffects]),
  ],
  providers: [UserManagementApiService],
})
export class AdminModule {}
