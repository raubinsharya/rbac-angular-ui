import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { UserListType } from '../model/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RoleType } from '../model/role.model';
import { Store } from '@ngrx/store';
import { selectBaseURLAndApplicationId } from '../store/selectors/user-list.selector';

export interface FetchUserInterface {
  'application-id': string;
}

export interface RoleAddResponse {
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserManagementApiService {
  private baseUrl!: string;
  private applicationId!: number;
  constructor(
    private http: HttpClient,
    private store: Store,
    private notification: NotificationService
  ) {
    this.store.select(selectBaseURLAndApplicationId).subscribe((url) => {
      this.baseUrl = url.baseUrl;
      this.applicationId = url.applicationId;
    });
  }

  public fetchRoles(applicationId: number): Observable<Array<RoleType>> {
    return this.http
      .get<Array<RoleType>>(
        `${this.baseUrl}/user-management/role?application-id=${applicationId}`
      )
      .pipe(catchError(this.handleError));
  }
  public fetchUsers(applicationId?: number): Observable<Array<UserListType>> {
    return this.http
      .get<Array<UserListType>>(
        `${this.baseUrl}/user-management/employee-role/users?application-id=${
          applicationId ?? this.applicationId
        }`
      )
      .pipe(catchError(this.handleError));
  }
  public createUser(email: string): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/user-management/employee`, {
        email: email,
        code1: '32100035',
        sailpointAccessId: '83747AB',
      })
      .pipe(catchError(this.handleError));
  }
  public addRolesToUser(
    roleIDs: Array<number>,
    email: string
  ): Observable<RoleAddResponse> {
    return this.http
      .post<RoleAddResponse>(
        `${this.baseUrl}/user-management/employee-role/add-role-to-user`,
        {
          userEmail: email,
          roleIds: roleIDs,
          applicationId: this.applicationId,
          sailpointAccessId: '83747AB',
        }
      )
      .pipe(catchError(this.handleError));
  }
  public removeRoleToUser(
    roleId: number,
    email: string
  ): Observable<RoleAddResponse> {
    return this.http
      .patch<RoleAddResponse>(
        `${this.baseUrl}/user-management/employee-role/status`,
        {
          email: email,
          roleId: roleId,
          applicationId: this.applicationId,
          sailPointAccessId: '123433',
          isActive: false,
        }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError = (error: HttpErrorResponse) => {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${
        error.error?.errorDesc ?? 'Internal Server error...'
      }`;
    }
    this.notification.showError(errorMessage);
    return throwError(() => new Error(errorMessage));
  };
}
