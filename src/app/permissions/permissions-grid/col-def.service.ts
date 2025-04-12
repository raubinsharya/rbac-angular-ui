import { ColDef } from 'ag-grid-community';

import { Injectable } from '@angular/core';
import moment from 'moment';
import { Store } from '@ngrx/store';
import { RoleType } from '../../models/role.model';
import { updatePermissionsStatus } from '../store/actions/permissions.action';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root',
})
export class PermissionsColDefs {
  constructor(
    private readonly store: Store,
    private readonly ngxPermission: NgxPermissionsService
  ) {}

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
        valueGetter: ({ data }) => Number(data?.id),
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
          this.ngxPermission
            .hasPermission(['root_admin', 'update_permissions_status'])
            .then((has) => {
              if (has)
                this.store.dispatch(
                  updatePermissionsStatus({
                    permissions: [{ permission: data.slug, status: newValue }],
                  })
                );
            });
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
