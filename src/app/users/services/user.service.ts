import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { UserProfileResponseType } from '../../models/user.model';
import { RoleType } from '../../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private readonly api: ApiService,
    private readonly notification: NotificationService
  ) {}

  public fetchUsers(): Observable<UserProfileResponseType[]> {
    return this.api
      .getData('/api/v1/admin/users')
      .pipe(catchError(this.handleError));
  }
  public fetchUserRoles(id: string): Observable<RoleType[]> {
    return this.api
      .getData(`/api/v1/admin/users/${id}/roles`)
      .pipe(catchError(this.handleError));
  }
  public fetchRoles(): Observable<RoleType[]> {
    return this.api
      .getData(`/api/v1/admin/roles`)
      .pipe(catchError(this.handleError));
  }
  public addRolesToUser(
    userId: string,
    ids: Array<string>
  ): Observable<RoleType[]> {
    return this.api
      .postData(`/api/v1/admin/users/${userId}/roles`, {
        roles: ids,
      })
      .pipe(catchError(this.handleError));
  }
  public deleteRolesToUser(
    userId: string,
    ids: Array<string>
  ): Observable<RoleType[]> {
    return this.api
      .deleteData(`/api/v1/admin/users/${userId}/roles`, {
        roles: ids,
      })
      .pipe(catchError(this.handleError));
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
