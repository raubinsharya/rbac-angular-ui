import { Component, inject, ViewEncapsulation } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

export interface MeMessageDialogComponentParams {
  title: string;
  tabs: Array<{ name: string; icon?: string; fieldName: string }>;
  data: any;
}

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrl: './message-dialog.component.scss',
})
export class MessageDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<MessageDialogComponent>);
  public payload: MeMessageDialogComponentParams = inject(MAT_DIALOG_DATA);

  get isDisabled(): boolean {
    return false;
  }

  formatText(text: string): string {
    return text ? text.replace(/#/g, '\n') : '';
  }

  onTextChange(event: any, idx: number) {
    const updatedValue = event.target.value.replace(/\n/g, '#');
    const texts = { ...this.payload.data[idx], itemText: updatedValue };
    this.payload.data[idx] = texts;
  }

  onConfirm(): void {
    this.dialogRef.close([...this.payload.data]);
  }
  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
