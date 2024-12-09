import { ColDef } from 'ag-grid-community';
import { Injectable } from '@angular/core';
import { RoleType } from '../../model/role.model';

@Injectable({
  providedIn: 'root',
})
export class ViewRoleDialogColDefs {
  getColDefs(): ColDef<RoleType>[] {
    return [
      {
        field: 'roleName',
        headerName: 'Role Name',
        sortable: true,
        editable: false,
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
        minWidth: 150,
        maxWidth: 150,
        filter: true,
      },
      {
        field: 'isActive',
        headerName: 'Active',
        sortable: true,
        editable: false,
        minWidth: 150,
        maxWidth: 150,
        filter: true,
        sort: 'desc',
      },
    ];
  }
}
