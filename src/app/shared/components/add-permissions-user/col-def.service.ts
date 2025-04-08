import { ColDef } from 'ag-grid-community';

import { Injectable } from '@angular/core';
import { PermissionType } from '../../../models/permission.model';

@Injectable({
  providedIn: 'root',
})
export class AddPermissionsColDefs {
  constructor() {}

  getColDefs(): ColDef<PermissionType>[] {
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
