import { Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  selectUserPermissions,
  selectUserPermissionsLoading,
} from '../../../users/store/selectors/users.selector';
import { RoleType } from '../../../models/role.model';
import { ColDef } from 'ag-grid-community';
import {
  deletePermissionsToUser,
  fetchUserPermissions,
} from '../../../users/store/actions/user.action';
import { isEmpty } from 'lodash';
import { PermissionColDefs } from './col-def.service';
import { PermissionType } from '../../../models/permission.model';
import { SharedAddPermissionsComponent } from '../add-permissions-user/add-permissions.component';
import { NgxPermissionsService } from 'ngx-permissions';
@Component({
  selector: 'app-shared-view-permissions',
  templateUrl: './shared-view-permissions.component.html',
  styleUrl: './shared-view-permissions.component.scss',
})
export class SharedViewPermissionsComponent implements OnInit {
  private readonly dialogRef = inject(
    MatDialogRef<SharedViewPermissionsComponent>
  );
  public rowData!: Array<PermissionType>;
  public colDefs!: ColDef[];
  public loading!: boolean;
  private readonly rowId = inject(MAT_DIALOG_DATA);
  public selectedRowIds!: Array<string>;

  constructor(
    private readonly store: Store,
    private readonly permissionColDefs: PermissionColDefs,
    private readonly dialog: MatDialog,
    private readonly ngxPermission: NgxPermissionsService
  ) {
    this.colDefs = this.permissionColDefs.getColDefs();
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
  closeDialog(): void {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
    this.ngxPermission
      .hasPermission(['root_admin', 'view_user_permissions'])
      .then((has) => {
        if (has) this.store.dispatch(fetchUserPermissions({ id: this.rowId }));
      });

    this.store.select(selectUserPermissions).subscribe((roles) => {
      this.rowData = roles as PermissionType[];
      this.selectedRowIds = [];
    });
    this.store
      .select(selectUserPermissionsLoading)
      .subscribe((loading) => (this.loading = loading));
  }

  onRowSelectionChange(selectedRows: RoleType[]) {
    this.selectedRowIds = selectedRows.map((row) => row.slug);
  }

  deletePermissions(): void {
    if (isEmpty(this.selectedRowIds)) return;
    this.store.dispatch(
      deletePermissionsToUser({ ids: this.selectedRowIds, userId: this.rowId })
    );
  }

  addPermissions(): void {
    this.dialog.open(SharedAddPermissionsComponent, {
      minWidth: '50vw',
      height: '80vh',
      data: {
        selectedData: this.rowData.map((row) => row.id),
        userId: this.rowId,
      },
    });
  }
}
