import { ColDef } from 'ag-grid-community';

import { Injectable } from '@angular/core';
import { UserProfileResponseType } from '../../models/user.model';
import moment from 'moment';
import { ViewRolesComponent } from './custom-cells/view-roles/view-roles.component';
import { ViewPermissionsComponent } from './custom-cells/view-permissions/view-permissions.component';
import {
  CustomDropDownComponent,
  DropdownRendererParams,
} from '../../shared/components/grid/custom-drop-down/custom-drop-down.component';

@Injectable({
  providedIn: 'root',
})
export class UsersColDefs {
  constructor() {}

  getColDefs(): ColDef<UserProfileResponseType>[] {
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
      },
      {
        field: 'firstName',
        headerName: 'First Name',
        sortable: true,
        editable: false,
        minWidth: 150,
        filter: true,
      },
      {
        field: 'middleName',
        headerName: 'Middle Name',
        sortable: true,
        editable: false,
        minWidth: 170,
        filter: true,
      },
      {
        field: 'lastName',
        headerName: 'Last Name',
        sortable: true,
        editable: false,
        minWidth: 150,
        filter: true,
      },
      {
        field: 'email',
        headerName: 'Email',
        sortable: true,
        editable: false,
        minWidth: 240,
        filter: true,
      },
      {
        field: 'mobile',
        headerName: 'Mobile',
        sortable: true,
        editable: false,
        minWidth: 240,
        filter: true,
      },
      {
        field: 'status',
        headerName: 'Status',
        sortable: true,
        editable: false,
        minWidth: 140,
        filter: true,
        cellRenderer: CustomDropDownComponent,
        cellRendererParams: {
          values: [
            { key: 'Unauth', value: 'unauth' },
            { key: 'Active', value: 'active' },
            { key: 'Deactive', value: 'deactive' },
            { key: 'Block', value: 'block' },
          ],
          displayKey: 'key',
          valueKey: 'value',
          toolTipValue: 'key'
        } as DropdownRendererParams,
      },
      {
        field: 'id',
        headerName: 'Roles',
        sortable: true,
        editable: false,
        minWidth: 140,
        filter: true,
        cellRenderer: ViewRolesComponent,
      },
      {
        field: 'id',
        headerName: 'Permissions',
        sortable: true,
        editable: false,
        minWidth: 170,
        filter: true,
        cellRenderer: ViewPermissionsComponent,
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        sortable: true,
        editable: false,
        minWidth: 170,
        filter: true,
        valueFormatter: ({ value }) => moment(value).format('DD-MM-YYYY hh:mm'),
      },
      {
        field: 'updatedAt',
        headerName: 'Updated At',
        sortable: true,
        editable: false,
        minWidth: 170,
        filter: true,
        valueFormatter: ({ value }) => moment(value).format('DD-MM-YYYY hh:mm'),
      },
    ];
  }
}
