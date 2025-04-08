import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { UserProfileResponseType } from '../../../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { SharedRoleViewPermissionsComponent } from '../../../../shared/components/view-role-permissions/shared-view-permissions.component';

@Component({
  selector: 'app-view-permissions',
  templateUrl: './view-permissions.component.html',
  styleUrl: './view-permissions.component.scss',
})
export class ViewPermissionsComponent {
  private rowData!: UserProfileResponseType;
  constructor(
    private readonly dialog: MatDialog,
    private readonly store: Store
  ) {}

  agInit(params: ICellRendererParams<UserProfileResponseType>): void {
    this.rowData = params.data as UserProfileResponseType;
  }

  public viewPermissions() {
    this.dialog.open(SharedRoleViewPermissionsComponent, {
      minWidth: '80vw',
      height: '80vh',
      data: this.rowData.id,
    });
  }
}
