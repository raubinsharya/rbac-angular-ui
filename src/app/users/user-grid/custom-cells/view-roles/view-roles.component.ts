import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererParams } from 'ag-grid-community';
import { SharedViewRolesComponent } from '../../../../shared/components/view-roles/view-roles.component';
import { UserProfileResponseType } from '../../../../models/user.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-view-roles',
  templateUrl: './view-roles.component.html',
  styleUrl: './view-roles.component.scss',
})
export class ViewRolesComponent {
  private rowData!: UserProfileResponseType;
  constructor(
    private readonly dialog: MatDialog,
    private readonly store: Store
  ) {}

  agInit(params: ICellRendererParams<UserProfileResponseType>): void {
    this.rowData = params.data as UserProfileResponseType;
  }

  public viewRoles() {
    this.dialog.open(SharedViewRolesComponent, {
      minWidth: '80vw',
      height: '80vh',
      data: this.rowData.id,
    });
  }
}
