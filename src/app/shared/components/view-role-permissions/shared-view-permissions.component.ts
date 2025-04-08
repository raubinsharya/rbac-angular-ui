import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectUserPermissionsLoading } from '../../../users/store/selectors/users.selector';
import { RoleType } from '../../../models/role.model';
import { ColDef } from 'ag-grid-community';
import { isEmpty } from 'lodash';
import { PermissionType } from '../../../models/permission.model';
import { SharedAddPermissionsComponent } from '../add-permissions-user/add-permissions.component';
import { RolePermissionColDefs } from './col-def.service';
import {
  fetchRolePermissions,
  removePermissionFromRole,
} from '../../../roles/store/actions/roles.action';
import { selectRolePermissions } from '../../../roles/store/selectors/roles.selector';
import { SharedAddPermissionsRoleComponent } from '../add-permissions-role/add-permissions-role.component';
@Component({
  selector: 'app-shared-role-view-permissions',
  templateUrl: './shared-role-view-permissions.component.html',
  styleUrl: './shared-role-view-permissions.component.scss',
})
export class SharedRoleViewPermissionsComponent {
  private readonly dialogRef = inject(
    MatDialogRef<SharedRoleViewPermissionsComponent>
  );
  public rowData!: Array<PermissionType>;
  public colDefs!: ColDef[];
  public loading!: boolean;
  private readonly rowId = inject(MAT_DIALOG_DATA);
  public selectedRowIds!: Array<string>;

  constructor(
    private readonly store: Store,
    private readonly permissionColDefs: RolePermissionColDefs,
    private readonly dialog: MatDialog
  ) {
    this.store.dispatch(fetchRolePermissions({ id: this.rowId }));
    this.colDefs = this.permissionColDefs.getColDefs();
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
  closeDialog(): void {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
    this.store.select(selectRolePermissions).subscribe((roles) => {
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
      removePermissionFromRole({
        permissions: this.selectedRowIds,
        id: this.rowId,
      })
    );
  }

  addPermissions(): void {
    this.dialog.open(SharedAddPermissionsRoleComponent, {
      minWidth: '50vw',
      height: '80vh',
      data: {
        selectedData: this.rowData.map((row) => row.id),
        userId: this.rowId,
      },
    });
  }
}
