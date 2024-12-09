import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererParams } from 'ag-grid-community';
import { ViewRoleDialogComponent } from '../../../view-role-dialog/view-role-dialog.component';

@Component({
  selector: 'app-view-roles',
  templateUrl: './view-roles.component.html',
  styleUrl: './view-roles.component.scss',
})
export class ViewRolesComponent {
  public totalRoles!: number;
  private rowData!: Array<number>;
  private userEmail!: string;

  constructor(private dialog: MatDialog) {}

  private agInit({ value, data }: ICellRendererParams): void {
    if (Array.isArray(value)) {
      this.totalRoles = value.length;
      this.rowData = value;
      this.userEmail = data.employeeEmail;
    }
  }

  public openRolesDialog() {
    this.dialog.open(ViewRoleDialogComponent, {
      minWidth: 900,
      minHeight: 600,
      data: {
        roles: this.rowData,
        userEmail: this.userEmail,
      },
    });
  }
}
