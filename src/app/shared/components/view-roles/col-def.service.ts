import { ColDef } from 'ag-grid-community';

import { Injectable } from '@angular/core';
import { RoleType } from '../../../models/role.model';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class RoleColDefs {
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
      {
        field: 'allowed',
        headerName: 'Allowed',
        sortable: true,
        editable: true,
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
