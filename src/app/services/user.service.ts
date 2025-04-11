import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { NotificationService } from './notification.service';
import { UserProfileResponseType } from '../models/user.model';
import { PermissionType } from '../models/permission.model';
import { NgxPermissionsService } from 'ngx-permissions';

export interface LoginPayloadType {
  email: string;
  password: string;
}

export interface LoginResponseType {
  token: string;
  user: UserProfileResponseType;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private readonly api: ApiService,
    private readonly notification: NotificationService,
    private readonly ngxPermission: NgxPermissionsService
  ) {}

  public login(loginPayload: LoginPayloadType): Observable<LoginResponseType> {
    return this.api
      .postData(`/api/v1/login`, {
        userName: loginPayload.email,
        password: loginPayload.password,
      })
      .pipe(catchError(this.handleError));
  }
  public getUserProfile(): Observable<UserProfileResponseType> {
    return this.api
      .getData(`/api/v1/user/profile`)
      .pipe(catchError(this.handleError));
  }

  public fetchUserProfilePermissions(): Observable<PermissionType[]> {
    if (!this.isLoggedIn()) return of([]);
    return this.api.getData('/api/v1/user/permissions').pipe(
      catchError(this.handleError),
      map((permissions: PermissionType[]) => {
        this.ngxPermission.loadPermissions(
          permissions.map((permission) => permission.slug)
        );
        return permissions;
      })
    );
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
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
