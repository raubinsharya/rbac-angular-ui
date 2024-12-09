import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ViewRoleDialogColDefs } from './colDefs.service';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { RoleType } from '../../model/role.model';
import { selectUsersRoles } from '../../store/selectors/user-list.selector';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { difference } from 'lodash';
import {
  addRolesToUser,
  removeRolesToUser,
} from '../../store/actions/user-management.action';

@Component({
  selector: 'app-view-role-dialog',
  templateUrl: './view-role-dialog.component.html',
  styleUrl: './view-role-dialog.component.scss',
})
export class ViewRoleDialogComponent {
  public colDefs!: ColDef[];
  public rowData!: Array<RoleType>;
  public userData = inject(MAT_DIALOG_DATA);
  public selectedRows: Array<any> = [];

  constructor(colDefService: ViewRoleDialogColDefs, private store: Store) {
    this.colDefs = colDefService.getColDefs();
    this.store.select(selectUsersRoles).subscribe((roles) => {
      this.rowData = roles.map((role) => {
        return {
          ...role,
          isActive: this.userData.roles.includes(role.roleId),
        };
      });
    });
  }

  onGridReady({ api }: GridReadyEvent): void {
    api.forEachNode((node) => {
      if (node.data.isActive) {
        node.setSelected(true);
      }
    });
  }

  handleSelectedRows(selectedRows: any[]) {
    this.selectedRows = selectedRows;
  }

  handleSave() {
    const selected = this.selectedRows.map((row) => row.roleId);
    const removed = difference(this.userData.roles, selected);
    const added = difference<number>(selected, this.userData.roles);
    this.store.dispatch(
      addRolesToUser({ roleIDs: added, email: this.userData.userEmail })
    );
    this.store.dispatch(
      removeRolesToUser({ roleIDs: removed, email: this.userData.userEmail })
    );
  }
}
