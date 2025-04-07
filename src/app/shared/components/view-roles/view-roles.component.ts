import { Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  selectUserRoles,
  selectUserRolesLoading,
} from '../../../users/store/selectors/users.selector';
import { RoleType } from '../../../models/role.model';
import { ColDef } from 'ag-grid-community';
import { SharedAddRolesComponent } from '../add-roles/add-roles.component';
import { RoleColDefs } from './col-def.service';
import {
  deleteRolesToUser,
  fetchUserRoles,
} from '../../../users/store/actions/user.action';
import { isEmpty } from 'lodash';

@Component({
  selector: 'roles-view-roles',
  templateUrl: './view-roles.component.html',
  styleUrl: './view-roles.component.scss',
})
export class SharedViewRolesComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<SharedViewRolesComponent>);
  public rowData!: Array<RoleType>;
  public colDefs!: ColDef[];
  public loading!: boolean;
  private readonly rowId = inject(MAT_DIALOG_DATA);
  public selectedRowIds!: Array<string>;

  constructor(
    private readonly store: Store,
    private readonly roleColDefs: RoleColDefs,
    private readonly dialog: MatDialog
  ) {
    this.store.dispatch(fetchUserRoles({ id: this.rowId }));
    this.colDefs = this.roleColDefs.getColDefs();
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
  closeDialog(): void {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
    this.store.select(selectUserRoles).subscribe((roles) => {
      this.rowData = roles as RoleType[];
      this.selectedRowIds = [];
    });
    this.store
      .select(selectUserRolesLoading)
      .subscribe((loading) => (this.loading = loading));
  }

  onRowSelectionChange(selectedRows: RoleType[]) {
    this.selectedRowIds = selectedRows.map((row) => row.slug);
  }

  deleteRoles(): void {
    if (isEmpty(this.selectedRowIds)) return;
    this.store.dispatch(
      deleteRolesToUser({ ids: this.selectedRowIds, userId: this.rowId })
    );
  }

  addRoles(): void {
    this.dialog.open(SharedAddRolesComponent, {
      minWidth: '40vw',
      height: '80vh',
      data: {
        selectedData: this.rowData.map((row) => row.id),
        userId: this.rowId,
      },
    });
  }
}
