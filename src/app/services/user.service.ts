import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { NotificationService } from './notification.service';
import { UserProfileResponseType } from '../models/user.model';

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
    private readonly notification: NotificationService
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

  handleError = (errors: string) => {
    if (Array.isArray(errors)) {
      errors.map((error) => {
        this.notification.showError(error.message);
      });
    }
    return throwError(() => errors);
  };
}
