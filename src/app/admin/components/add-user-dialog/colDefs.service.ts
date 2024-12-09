import { ColDef } from 'ag-grid-community';
import { Injectable } from '@angular/core';
import { RoleType } from '../../model/role.model';

@Injectable({
  providedIn: 'root',
})
export class AddRoleDialogColDefs {
  getColDefs(): ColDef<RoleType>[] {
    return [
      {
        field: 'roleName',
        headerName: 'Role Name',
        sortable: true,
        editable: false,
        minWidth: 120,
        filter: true,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        valueFormatter: ({ value }) => value.toUpperCase(),
      },
      {
        field: 'roleId',
        headerName: 'Role ID',
        sortable: true,
        editable: false,
        minWidth: 100,
        maxWidth: 120,
        filter: true,
        sort: 'asc',
      },
    ];
  }
}
