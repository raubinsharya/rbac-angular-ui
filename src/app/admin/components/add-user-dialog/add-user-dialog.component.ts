import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddRoleDialogColDefs } from './colDefs.service';
import { ColDef } from 'ag-grid-community';
import { RoleType } from '../../model/role.model';
import { selectUsersRoles } from '../../store/selectors/user-list.selector';
import { addRolesToUser } from '../../store/actions/user-management.action';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss',
})
export class AddUserDialogComponent {
  public colDefs!: ColDef[];
  public rowData!: Array<RoleType>;
  public selectedRows: Array<any> = [];

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(colDefService: AddRoleDialogColDefs, private store: Store) {
    this.colDefs = colDefService.getColDefs();
    this.store
      .select(selectUsersRoles)
      .subscribe((roles) => (this.rowData = roles));
  }

  handleSelectedRows(selectedRows: any[]) {
    this.selectedRows = selectedRows;
  }

  handleAdd() {
    const selected = this.selectedRows.map((row) => row.roleId);
    this.store.dispatch(
      addRolesToUser({
        roleIDs: selected,
        email: this.emailFormControl.value as string,
      })
    );
  }
}
