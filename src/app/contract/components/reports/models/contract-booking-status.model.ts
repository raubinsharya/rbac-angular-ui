export interface ContractBookingStatusModel {
  bookedBy: string;
  sapContractNumber: string;
  bookedDate: string;
  fileName?: string | null;
  csbrNumber?: string | null;
  date: string;
  poNumber: string;
  quoteRefNumber: string;
  sourceSystemHeaderId: string;
  poDate: string;
  salesOrg: string;
  salesDocType: string;
  contractType: string;
  totalPrice: string;
  currency: string;
  idpCheck: string;
  basicValCheck: string;
  basicValCheckLogs: string;
  contractCreationStatus: string;
  contractCreationErrorLogs?: null;
}
