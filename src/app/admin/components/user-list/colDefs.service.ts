import { ColDef } from 'ag-grid-community';
import { Injectable } from '@angular/core';
import { ViewRolesComponent } from './custom-cell/view-roles/view-roles.component';

@Injectable({
  providedIn: 'root',
})
export class UserManagementColDefs {
  getColDefs(): ColDef[] {
    return [
      {
        field: 'employeeEmail',
        headerName: 'Email',
        sortable: true,
        editable: false,
        minWidth: 140,
        filter: true,
        sort: 'desc',
      },
      {
        field: 'displayName',
        headerName: 'Name',
        sortable: true,
        editable: false,
        minWidth: 140,
        filter: true,
      },
      {
        field: 'roleIds',
        headerName: 'Roles',
        sortable: true,
        editable: false,
        maxWidth: 200,
        filter: true,
        cellRenderer: ViewRolesComponent,
      },
    ];
  }
}
