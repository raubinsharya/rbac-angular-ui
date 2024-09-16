import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { SharedMaterialModule } from '../../../../../../material.module';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BasicValcheckDialogComponent } from '../../../basic-valcheck-dialog/basic-valcheck-dialog.component';

@Component({
  selector: 'app-basicval',
  templateUrl: './basicval.component.html',
  styleUrl: './basicval.component.scss',
  standalone: true,
  imports: [SharedMaterialModule, CommonModule],
})
export class BasicvalCheckRenderComponent {
  public basicValCheck!: {
    text: string;
    icon: string;
    className: string;
  };
  public basicValCheckLogs!: string;

  private basicValCheckMapping: {
    [k: string]: { text: string; icon: string; className: string };
  } = {
    VAL_SUCCESS: {
      text: 'SUCCESS',
      icon: 'check_circle',
      className: 'success',
    },
    VAL_FAILED: {
      text: 'FAILED',
      icon: 'error',
      className: 'failed',
    },
    VAL_PENDING: {
      text: 'PENDING',
      icon: 'pending',
      className: 'pending',
    },
  };

  constructor(private dialog: MatDialog) {}

  agInit(params: ICellRendererParams): void {
    this.basicValCheck = this.basicValCheckMapping[params.value] ?? {
      text: params.value,
      className: 'default',
      icon: 'fmd_bad',
    };
    this.basicValCheckLogs = params.data.basicValCheckLogs;
  }

  openDialog = () => {
    this.dialog.open(BasicValcheckDialogComponent, {
      minWidth: '800px',
      data: {
        data: JSON.parse(this.basicValCheckLogs),
        status: this.basicValCheck,
      },
    });
  };
}
