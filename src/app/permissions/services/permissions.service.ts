import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { RoleType } from '../../models/role.model';
import { PermissionType } from '../../models/permission.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(
    private readonly api: ApiService,
    private readonly notification: NotificationService
  ) {}

  public fetchPermissions(): Observable<PermissionType[]> {
    return this.api
      .getData(`/api/v1/admin/permissions`)
      .pipe(catchError(this.handleError));
  }

  public updatePermissionstatus(
    permissions: Array<{ permission: string; status: boolean }>
  ): Observable<PermissionType[]> {
    return this.api
      .patchData(`/api/v1/admin/permissions`, {
        permissions: permissions,
      })
      .pipe(catchError(this.handleError));
  }
  public createPermissions(
    permissions: Array<{ slug: string; title: string }>
  ): Observable<PermissionType[]> {
    return this.api
      .postData(`/api/v1/admin/permissions`, {
        permissions: permissions,
      })
      .pipe(catchError(this.handleError));
  }
  public deletePermissions(ids: Array<string>): Observable<RoleType[]> {
    return this.api
      .deleteData(`/api/v1/admin/permissions`, {
        permissions: ids,
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
