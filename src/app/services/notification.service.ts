import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, title?: string) {
    this.toastr.success(message, title, { closeButton: true });
  }

  showError(message: string, title?: string) {
    this.toastr.error(message, title, { closeButton: true });
  }

  showInfo(message: string, title?: string) {
    this.toastr.info(message, title, { closeButton: true });
  }

  showWarning(message: string, title?: string) {
    this.toastr.warning(message, title, { closeButton: true });
  }
}
