import { Component } from '@angular/core';
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

@Component({
  selector: 'roles-role-grid',
  templateUrl: './role-grid.component.html',
  styleUrl: './role-grid.component.scss',
})
export class PermissionsGridComponent {
  public colDefs!: ColDef[];
  public rowData!: RoleType[];
  public selectedRowIds: Array<string> = [];

  constructor(
    private readonly colDef: PermissionsColDefs,
    private readonly store: Store,
    private readonly dialog: MatDialog
  ) {
    this.store.dispatch(fetchPermissions());
    this.colDefs = this.colDef.getColDefs();
    this.store
      .select(selectPermissions)
      .subscribe(
        (roles) => (this.rowData = structuredClone(roles) as RoleType[])
      );
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
    this.store.dispatch(deletePermissions({ ids: this.selectedRowIds }));
  }
}
