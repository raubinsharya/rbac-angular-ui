import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { UserProfileResponseType } from '../../models/user.model';
import { RoleType } from '../../models/role.model';
import { PermissionType } from '../../models/permission.model';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(
    private readonly api: ApiService,
    private readonly notification: NotificationService
  ) {}

  public fetchRoles(): Observable<RoleType[]> {
    return this.api
      .getData(`/api/v1/admin/roles`)
      .pipe(catchError(this.handleError));
  }
  public fetchRolePermissions(id: string): Observable<PermissionType[]> {
    return this.api
      .getData(`/api/v1/admin/roles/${id}/permissions`)
      .pipe(catchError(this.handleError));
  }
  public addRolePermissions(
    id: string,
    permissions: Array<string>
  ): Observable<PermissionType[]> {
    return this.api
      .postData(`/api/v1/admin/roles/${id}/permissions`, { permissions })
      .pipe(catchError(this.handleError));
  }
  public removeRolePermissions(
    id: string,
    permissions: Array<string>
  ): Observable<PermissionType[]> {
    return this.api
      .deleteData(`/api/v1/admin/roles/${id}/permissions`, { permissions })
      .pipe(catchError(this.handleError));
  }
  public fetchPermissions(): Observable<PermissionType[]> {
    return this.api
      .getData(`/api/v1/admin/permissions`)
      .pipe(catchError(this.handleError));
  }
  public updateRoleStatus(
    roles: Array<{ role: string; status: boolean }>
  ): Observable<PermissionType[]> {
    return this.api
      .patchData(`/api/v1/admin/roles`, {
        roles: roles,
      })
      .pipe(catchError(this.handleError));
  }
  public createRoles(
    roles: Array<{ slug: string; title: string }>
  ): Observable<RoleType[]> {
    return this.api
      .postData(`/api/v1/admin/roles`, {
        roles: roles,
      })
      .pipe(catchError(this.handleError));
  }
  public deleteRoles(ids: Array<string>): Observable<RoleType[]> {
    return this.api
      .deleteData(`/api/v1/admin/roles`, {
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
