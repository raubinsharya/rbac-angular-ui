import { ColDef } from 'ag-grid-community';

import { Injectable } from '@angular/core';
import { RoleType } from '../../../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class AddRolesColDefs {
  constructor() {}

  getColDefs(): ColDef<RoleType>[] {
    return [
      {
        field: 'id',
        headerName: 'Id',
        sortable: true,
        editable: false,
        minWidth: 90,
        maxWidth: 90,
        filter: true,
        sort: 'asc',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        showDisabledCheckboxes: true,
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
        editable: false,
        minWidth: 170,
        filter: true,
      },
    ];
  }
}
