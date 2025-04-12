import { Component, OnInit } from '@angular/core';
import { CellValueChangedEvent, ColDef } from 'ag-grid-community';
import { Store } from '@ngrx/store';
import { RoleType } from '../../models/role.model';
import { PermissionsColDefs } from './col-def.service';
import { MatDialog } from '@angular/material/dialog';
import { SharedCreateRoleComponent } from '../../shared/components/create-role/create-role.component';
import {
  deletePermissions,
  fetchPermissions,
} from '../store/actions/permissions.action';
import { selectPermissions } from '../store/selectors/permissions.selector';
import { SharedCreatePermissionComponent } from '../../shared/components/create-permission/create-permission.component';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'roles-role-grid',
  templateUrl: './role-grid.component.html',
  styleUrl: './role-grid.component.scss',
})
export class PermissionsGridComponent implements OnInit {
  public colDefs!: ColDef[];
  public rowData!: RoleType[];
  public selectedRowIds: Array<string> = [];

  constructor(
    private readonly colDef: PermissionsColDefs,
    private readonly store: Store,
    private readonly dialog: MatDialog,
    private readonly ngxPermission: NgxPermissionsService
  ) {
    this.colDefs = this.colDef.getColDefs();
    this.store
      .select(selectPermissions)
      .subscribe(
        (permissions) =>
          (this.rowData = structuredClone(permissions) as RoleType[])
      );
  }

  ngOnInit(): void {
    this.ngxPermission
      .hasPermission(['root_admin', 'view_permissions'])
      .then((has) => {
        if (has) this.store.dispatch(fetchPermissions());
      });
  }

  onCellValueChanged(props: CellValueChangedEvent) {}

  openCreateDialog() {
    this.dialog.open(SharedCreatePermissionComponent, {
      minWidth: '30vw',
      height: '30vh',
    });
  }
  onRowSelectionChange(selectedRows: RoleType[]) {
    this.selectedRowIds = selectedRows.map((row) => row.slug);
  }

  deletePermissions() {
    this.ngxPermission
      .hasPermission(['root_admin', 'delete_permissions'])
      .then((has) => {
        if (has)
          this.store.dispatch(deletePermissions({ ids: this.selectedRowIds }));
      });
  }
}
