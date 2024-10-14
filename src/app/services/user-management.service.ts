import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { NotificationService } from './notification.service';
import { UserRoleInterface } from '../models/user-management.model';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  constructor(
    private api: ApiService,
    private notification: NotificationService
  ) {}

  public fetchUserRoles(email: string): Observable<UserRoleInterface[]> {
    return this.api
      .getData(`/user-management/employee-role?application-id=2&email=${email}`)
      .pipe(catchError(this.handleError));
  }

  handleError = (error: string) => {
    this.notification.showError(error);
    return throwError(() => new Error(error));
  };
}
