import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-view-permissions',
  templateUrl: './view-permissions.component.html',
  styleUrl: './view-permissions.component.scss',
})
export class ViewPermissionsComponent {
  agInit(params: ICellRendererParams): void {}
}
