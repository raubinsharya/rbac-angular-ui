import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiService } from '../../../../services/api.service';
import { NotificationService } from '../../../../services/notification.service';
import { ContractBookingStatusPayload } from '../store/actions/contract-report.action';
import { ContractBookingStatusModel } from '../models/contract-booking-status.model';

@Injectable({
  providedIn: 'root',
})
export class ContractReportService {
  constructor(
    private api: ApiService,
    private notification: NotificationService
  ) {}

  public fetchContractBookingStatusReport(
    payload: ContractBookingStatusPayload
  ): Observable<Array<ContractBookingStatusModel>> {
    return this.api
      .postData('/qqoperator/contract-report', payload)
      .pipe(catchError(this.handleError));
  }

  handleError = (error: string) => {
    this.notification.showError(error);
    return throwError(() => new Error(error));
  };
}
