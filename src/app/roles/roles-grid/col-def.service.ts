import { ColDef } from 'ag-grid-community';

import { Injectable } from '@angular/core';
import moment from 'moment';
import { Store } from '@ngrx/store';
import { RoleType } from '../../models/role.model';
import { ViewPermissionsComponent } from './custom-cells/view-permissions/view-permissions.component';
import { updateRoleStatus } from '../store/actions/roles.action';

@Injectable({
  providedIn: 'root',
})
export class RolesColDefs {
  constructor(private readonly store: Store) {}

  getColDefs(): ColDef<RoleType>[] {
    return [
      {
        field: 'id',
        headerName: 'Id',
        sortable: true,
        editable: false,
        minWidth: 110,
        maxWidth: 110,
        filter: false,
        sort: 'asc',
        checkboxSelection: true,
        headerCheckboxSelection: true,
      },
      {
        field: 'slug',
        headerName: 'Slug',
        sortable: true,
        editable: false,
        minWidth: 150,
        filter: true,
      },
      {
        field: 'title',
        headerName: 'Role Name',
        sortable: true,
        editable: true,
        minWidth: 170,
        filter: true,
      },
      {
        field: 'allowed',
        headerName: 'Allowed',
        sortable: true,
        editable: true,
        minWidth: 150,
        filter: true,
        onCellValueChanged: ({ newValue, data }) => {
          this.store.dispatch(
            updateRoleStatus({ roles: [{ role: data.slug, status: newValue }] })
          );
        },
      },
      {
        field: 'scope',
        headerName: 'Scope',
        sortable: true,
        editable: false,
        minWidth: 240,
        filter: true,
      },
      {
        field: 'id',
        headerName: 'View Permissions',
        sortable: true,
        editable: false,
        minWidth: 240,
        filter: false,
        cellRenderer: ViewPermissionsComponent,
      },
      {
        field: 'updatedAt',
        headerName: 'Updated At',
        sortable: true,
        editable: false,
        minWidth: 240,
        filter: true,
        valueFormatter: ({ value }) =>
          moment(value).format('DD-MM-YYYY MM:HH A'),
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        sortable: true,
        editable: false,
        minWidth: 240,
        filter: true,
        valueFormatter: ({ value }) =>
          moment(value).format('DD-MM-YYYY MM:HH A'),
      },
    ];
  }
}
