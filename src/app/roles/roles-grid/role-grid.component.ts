import { Component, OnInit } from '@angular/core';
import {
  CellValueChangedEvent,
  ColDef,
  SelectionChangedEvent,
} from 'ag-grid-community';
import { Store } from '@ngrx/store';
import { deleteRoles, fetchRoles } from '../store/actions/roles.action';
import { RoleType } from '../../models/role.model';
import { RolesColDefs } from './col-def.service';
import { selectRoles } from '../store/selectors/roles.selector';
import { MatDialog } from '@angular/material/dialog';
import { SharedCreateRoleComponent } from '../../shared/components/create-role/create-role.component';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'roles-role-grid',
  templateUrl: './role-grid.component.html',
  styleUrl: './role-grid.component.scss',
})
export class RoleGridComponent implements OnInit {
  public colDefs!: ColDef[];
  public rowData!: RoleType[];
  public selectedRowIds: Array<string> = [];

  constructor(
    private readonly colDef: RolesColDefs,
    private readonly store: Store,
    private readonly dialog: MatDialog,
    private readonly ngxPermission: NgxPermissionsService
  ) {
    this.colDefs = this.colDef.getColDefs();
    this.store
      .select(selectRoles)
      .subscribe(
        (roles) => (this.rowData = structuredClone(roles) as RoleType[])
      );
  }

  ngOnInit(): void {
    this.ngxPermission
      .hasPermission(['root_admin', 'view_roles'])
      .then((has) => {
        if (has) this.store.dispatch(fetchRoles());
      });
  }

  onCellValueChanged(props: CellValueChangedEvent) {}

  openCreateDialog() {
    this.dialog.open(SharedCreateRoleComponent, {
      minWidth: '30vw',
      height: '30vh',
    });
  }
  onRowSelectionChange(selectedRows: RoleType[]) {
    this.selectedRowIds = selectedRows.map((row) => row.slug);
  }

  deleteRoles() {
    this.store.dispatch(deleteRoles({ ids: this.selectedRowIds }));
  }
}
