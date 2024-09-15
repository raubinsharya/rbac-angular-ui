import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { DueList } from '../models/duelist.model';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  constructor(
    private api: ApiService,
    private notification: NotificationService
  ) {}

  public getDueLists(): Observable<DueList[]> {
    return this.api
      .postData('/qqoperator/duelist', {
        salesOrgIdList: ['NZ90', 'AU90', 'US93'],
      })
      .pipe(catchError(this.handleError));
  }
  handleError = (error: string) => {
    this.notification.showError(error);
    return throwError(() => new Error(error));
  };
}
