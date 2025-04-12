import { Component, OnInit } from '@angular/core';
import { UsersColDefs } from './col-def.service';
import { CellValueChangedEvent, ColDef } from 'ag-grid-community';
import { Store } from '@ngrx/store';
import { fetchUsers } from '../store/actions/user.action';
import { selectUsers } from '../store/selectors/users.selector';
import { UserProfileResponseType } from '../../models/user.model';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'users-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrl: './user-grid.component.scss',
})
export class UserGridComponent implements OnInit {
  public colDefs!: ColDef[];
  public rowData!: UserProfileResponseType[];
  public permissions!: string[];

  constructor(
    private readonly colDef: UsersColDefs,
    private readonly store: Store,
    private readonly ngxPermission: NgxPermissionsService
  ) {
    this.colDefs = this.colDef.getColDefs();
    this.store
      .select(selectUsers)
      .subscribe(
        (users) =>
          (this.rowData = structuredClone(users) as UserProfileResponseType[])
      );
  }

  ngOnInit() {
    this.ngxPermission
      .hasPermission(['view_users', 'root_admin'])
      .then((has) => {
        if (has) this.store.dispatch(fetchUsers());
      });
  }

  onCellValueChanged(props: CellValueChangedEvent) {}
}
