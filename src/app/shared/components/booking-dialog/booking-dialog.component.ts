import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrl: './booking-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingDialogComponent {
  readonly cfdChecked = model(false);
  readonly poChecked = model(false);

  readonly dialogRef = inject(MatDialogRef<BookingDialogComponent>);

  get isDisabled(): boolean {
    return !this.cfdChecked() || !this.poChecked();
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
