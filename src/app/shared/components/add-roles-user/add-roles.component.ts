import { Component, inject, OnInit } from '@angular/core';
import { AddRolesColDefs } from './col-def.service';
import { ColDef } from 'ag-grid-community';
import { Store } from '@ngrx/store';
import { RoleType } from '../../../models/role.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isEmpty } from 'lodash';
import { selectRoles } from '../../../users/store/selectors/roles.selector';
import {
  addRolesToUser,
  fetchRoles,
} from '../../../users/store/actions/user.action';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrl: './add-roles.component.scss',
})
export class SharedAddRolesComponent implements OnInit {
  colDefs!: ColDef[];
  rowData!: RoleType[];
  public readonly dialogData: { selectedData: Array<string>; userId: string } =
    inject(MAT_DIALOG_DATA);
  public selectedRowIds: Array<string> = [];

  constructor(
    private readonly addColDef: AddRolesColDefs,
    private readonly store: Store,
    private readonly ngxPermission: NgxPermissionsService
  ) {
    this.colDefs = this.addColDef.getColDefs();
  }
  ngOnInit() {
    this.ngxPermission
      .hasPermission(['root_admin', 'add_user_roles'])
      .then((has) => {
        if (has) this.store.dispatch(fetchRoles());
      });
    this.store.select(selectRoles).subscribe((roles) => {
      if (isEmpty(roles)) return;
      this.rowData = (roles as RoleType[]).filter(
        (role) => !this.dialogData.selectedData.includes(role.id)
      );
    });
  }

  onRowSelectionChange(selectedRows: RoleType[]) {
    this.selectedRowIds = selectedRows.map((row) => row.slug);
  }

  addRoles() {
    if (isEmpty(this.selectedRowIds)) return;
    this.store.dispatch(
      addRolesToUser({
        ids: this.selectedRowIds,
        userId: this.dialogData.userId,
      })
    );
  }
}
