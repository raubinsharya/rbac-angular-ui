import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { DueList } from '../models/duelist.model';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { QuoteDetailsType } from '../models/contract-overview.model';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  constructor(
    private api: ApiService,
    private notification: NotificationService
  ) {}

  public getDueLists(payload: {
    salesOrgIdList: Array<string>;
  }): Observable<DueList[]> {
    return this.api
      .postData('/qqoperator/duelist', payload)
      .pipe(catchError(this.handleError));
  }
  public getContractOverivew(
    sourceSystemHeaderId: string
  ): Observable<QuoteDetailsType> {
    return this.api
      .postData('/qqoperator/quotedetails', {
        sourceSystemHeaderId: sourceSystemHeaderId,
      })
      .pipe(catchError(this.handleError));
  }

  handleError = (error: string) => {
    this.notification.showError(error);
    return throwError(() => new Error(error));
  };
}
