import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ViewRoleDialogColDefs } from './colDefs.service';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { RoleType } from '../../model/role.model';
import {
  selectUserRoleUpdate,
  selectUsersRoles,
} from '../../store/selectors/user-list.selector';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { difference, isEmpty } from 'lodash';
import {
  addRolesToUser,
  closeViewUserRoleDialog,
  removeRolesToUser,
  resetSaveButtonUserRoleDialog,
} from '../../store/actions/user-management.action';
import { Actions, ofType } from '@ngrx/effects';

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
  public userRoleUpdateLoading!: boolean;
  public saveBtnDisabled: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<ViewRoleDialogComponent>,
    colDefService: ViewRoleDialogColDefs,
    private store: Store,
    private actions$: Actions
  ) {
    this.colDefs = colDefService.getColDefs();
    this.store.select(selectUsersRoles).subscribe((roles) => {
      this.rowData = roles.map((role) => {
        return {
          ...role,
          isActive: this.userData.roles.includes(role.roleId),
        };
      });
    });
    this.store
      .select(selectUserRoleUpdate)
      .subscribe((loading) => (this.userRoleUpdateLoading = loading));
  }

  ngOnInit() {
    this.actions$.pipe(ofType(resetSaveButtonUserRoleDialog)).subscribe(() => {
      this.saveBtnDisabled = false;
    });
    this.actions$.pipe(ofType(closeViewUserRoleDialog)).subscribe(() => {
      this.dialogRef.close();
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
    const { added, removed } = this.getRoleDifferences();
    this.saveBtnDisabled = isEmpty(removed) && isEmpty(added);
  }

  handleSave() {
    const { added, removed } = this.getRoleDifferences();

    if (!isEmpty(added)) {
      this.store.dispatch(
        addRolesToUser({ roleIDs: added, email: this.userData.userEmail })
      );
    }

    if (!isEmpty(removed)) {
      this.store.dispatch(
        removeRolesToUser({ roleIDs: removed, email: this.userData.userEmail })
      );
    }
    this.saveBtnDisabled = true;
  }

  private getRoleDifferences() {
    const selected = this.selectedRows.map((row) => row.roleId);
    const removed = difference(this.userData.roles, selected);
    const added = difference<number>(selected, this.userData.roles);

    return { added, removed };
  }
}
