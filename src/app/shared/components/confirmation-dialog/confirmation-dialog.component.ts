import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent {
  private readonly dialogRef = inject(
    MatDialogRef<ConfirmationDialogComponent>
  );
  public payload: { title: string; description: string } =
    inject(MAT_DIALOG_DATA);

  onConfirm(): void {
    this.dialogRef.close(true);
  }
  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
