import { ColDef } from 'ag-grid-community';

import { Injectable } from '@angular/core';
import moment from 'moment';
import { PermissionType } from '../../../models/permission.model';

@Injectable({
  providedIn: 'root',
})
export class RolePermissionColDefs {
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
        headerName: 'Permission Name',
        sortable: true,
        editable: true,
        minWidth: 190,
        filter: true,
      },
      {
        field: 'allowed',
        headerName: 'Allowed',
        sortable: true,
        editable: false,
        minWidth: 150,
        filter: true,
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
