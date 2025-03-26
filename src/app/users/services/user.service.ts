import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private readonly api: ApiService,
    private readonly notification: NotificationService
  ) {}

  public fetchUsers(): Observable<any> {
    return this.api.getData('/api/v1/admin/users').pipe(catchError(this.handleError));
  }

  handleError = (errors: string) => {
    if (Array.isArray(errors)) {
      errors.map((error) => {
        this.notification.showError(error.message);
      });
    }
    return throwError(() => errors);
  };
}
