import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { DueList } from '../models/duelist.model';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import {
  CommercialContractType,
  QuoteDetailsType,
} from '../models/contract-overview.model';
import { PartnerPayload } from '../store/actions/contract-overview.action';
import { PartnerResponseType } from '../models/partner-response.model';
import { EquipmentType } from '../models/equipment.model';
import { ValidationResponse } from '../models/validation.model';
import { SimulationResponseType } from '../models/SimulationResponse.model';

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

  public getPartnerData(
    payload: PartnerPayload
  ): Observable<PartnerResponseType[]> {
    return this.api
      .postData('/daasqq/partner', {
        ...payload,
      })
      .pipe(catchError(this.handleError));
  }
  public getEquipmentData(
    equipmentNumber: string
  ): Observable<EquipmentType[]> {
    return this.api
      .getData(`/daasqq/equipment?equipmentNumber=${equipmentNumber}`)
      .pipe(catchError(this.handleError));
  }
  public validateContract(
    payload: QuoteDetailsType
  ): Observable<ValidationResponse[]> {
    return this.api
      .postData(`/qqvalidator/validate`, payload)
      .pipe(catchError(this.handleError));
  }
  public postSimulateContract(
    payload: QuoteDetailsType | { simulatedBy: string },
    url: string
  ): Observable<SimulationResponseType> {
    return this.api
      .postData(url, { ...payload })
      .pipe(catchError(this.handleError));
  }

  handleError = (error: string) => {
    this.notification.showError(error);
    return throwError(() => new Error(error));
  };
}
