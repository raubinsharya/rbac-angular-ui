import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxPermissionsService } from 'ngx-permissions';
import {
  selectRoles,
  selectUserRolesError,
} from './store/selectos/user-management.selector';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  public userRoleError!: string | null;
  constructor(
    private ngxPermission: NgxPermissionsService,
    private store: Store
  ) {
    this.store.select(selectRoles).subscribe((roles) => {
      this.ngxPermission.loadPermissions(roles);
    });
    this.store
      .select(selectUserRolesError)
      .subscribe((error) => (this.userRoleError = error));
  }
}
