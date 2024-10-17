import { http, HttpResponse } from 'msw';
import DueListResponse from './response/dueList.json';
import QuoteDetailResponse from './response/quotedetails.json';
import ValidateResponse from './response/validate.json';
import PartnerResponse from './response/partner.json';
import TranslatorResponse from './response/enrichBusinessHours.json';
import EquipmentResponse from './response/equipment.json';
import UserRoleResponse from './response/userRoles.json';
import ContractReportResponse from './response/contractReport.json';
import ContractUpdateResponse from './response/contractUpdate.json';
import { environment } from '../environments/environment';

export const handlers = [
  // http.post(
  //   `${environment.BASE_PATH}/qqoperator/duelist`,
  //   () => {
  //     return HttpResponse.json(DueListResponse);
  //   }
  // ),
  http.post(
    `${environment.BASE_PATH}/qqoperator/quotedetails`,
    () => {
      return HttpResponse.json(QuoteDetailResponse);
    }
  ),
  // http.post(
  //   `${environment.BASE_PATH}/qqvalidator/validate`,
  //   () => {
  //     return HttpResponse.json(ValidateResponse);
  //   }
  // ),
  // http.get(
  //   `${environment.BASE_PATH}/qqoperator/paymentterm`,
  //   () => {
  //     return HttpResponse.json(true);
  //   }
  // ),
  // http.post(
  //   `${environment.BASE_PATH}/qqoperator/updatesubmit`,
  //   () => {
  //     return HttpResponse.json('SUCCESS');
  //   }
  // ),
  // http.post(
  //   `${environment.BASE_PATH}/qqoperator/submitquote`,
  //   () => {
  //     return HttpResponse.json('SUCCESS');
  //   }
  // ),
  // http.post(
  //   `${environment.BASE_PATH}/qqoperator/updatesimulate`,
  //   () => {
  //     return HttpResponse.json('SUCCESS');
  //   }
  // ),
  // http.post(
  //   `${environment.BASE_PATH}/qqoperator/simulatequote`,
  //   () => {
  //     return HttpResponse.json('SUCCESS');
  //   }
  // ),
  http.post(`${environment.BASE_PATH}/daasqq/partner`, () => {
    return HttpResponse.json(PartnerResponse);
  }),
  // http.post(
  //   `${environment.BASE_PATH}/sstranslator/enrichBusinessHours`,
  //   () => {
  //     return HttpResponse.json(TranslatorResponse);
  //   }
  // ),
  // http.get(`${environment.BASE_PATH}/daasqq/equipment`, () => {
  //   return HttpResponse.json(EquipmentResponse);
  // }),
  // http.get(`${environment.BASE_PATH}/user-management/employee-role`, () => {
  //   return HttpResponse.json(UserRoleResponse);
  // }),
  // http.post(
  //   `${environment.BASE_PATH}/qqoperator/contract-report`,
  //   () => {
  //     return HttpResponse.json(ContractReportResponse);
  //   }
  // ),
  // http.get(
  //   `${environment.BASE_PATH}/daasqq/contract?contractNumber=0043113721&salesDocType=ZCSS&idx=10`,
  //   () => {
  //     return HttpResponse.json(ContractUpdateResponse);
  //   }
  // ),
];
