import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { UserManagementColDefs } from './colDefs.service';
import { Store } from '@ngrx/store';
import {
  fetchRoles,
  fetchUsers,
  updateBaseUrl,
} from '../../store/actions/user-management.action';
import { UserListType } from '../../model/user.model';
import { selectUsersList } from '../../store/selectors/user-list.selector';
import { Dialog } from '@angular/cdk/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  environments: Array<{ name: string; path: string }> = [
    {
      name: 'Dev',
      path: 'https://dev.apps.api.it.philips.com/hyperautomation',
    },
    {
      name: 'Test',
      path: 'https://dev.apps.api.it.philips.com/test/hyperautomation',
    },
    {
      name: 'ACC',
      path: 'https://acc.apps.api.it.philips.com/hyperautomation',
    },
    { name: 'Prod', path: 'https://apps.api.it.philips.com/hyperautomation' },
  ];
  applicationId: Array<{ id: number; name: string }> = [
    { id: 2, name: 'Quick Quote' },
    { id: 5, name: 'AVW' },
  ];
  public rowData: Array<UserListType> = [];

  userManagementForm = new FormGroup({
    environment: new FormControl(this.environments[0].path),
    application: new FormControl(this.applicationId[0].id),
  });

  public colDefs!: ColDef[];

  constructor(
    colDefService: UserManagementColDefs,
    private store: Store,
    private dialog: MatDialog
  ) {
    this.colDefs = colDefService.getColDefs();
    this.store
      .select(selectUsersList)
      .subscribe((usersList) => (this.rowData = usersList));
  }

  public handleFetchUsers() {
    const { application, environment } = this.userManagementForm.value;
    this.store.dispatch(
      updateBaseUrl({
        baseUrl: environment as string,
        applicationId: application as number,
      })
    );
    this.store.dispatch(
      fetchRoles({
        applicationId: application as number,
      })
    );
    this.store.dispatch(
      fetchUsers({
        applicationId: application as number,
      })
    );
  }

  ngOnInit() {
    this.handleFetchUsers();
  }

  addUser() {
    this.dialog.open(AddUserDialogComponent, {
      minHeight: 600,
      minWidth: 600,
    });
  }
}
