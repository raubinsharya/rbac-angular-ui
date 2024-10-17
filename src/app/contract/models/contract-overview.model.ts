export interface QuoteDetailsType {
  isUpdated: string | 'Yes';
  commercialContract: CommercialContractType;
  rsmDetails: any[];
  APIHeader: APIHeaderType;
}

export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type NestedQuoteDetailsType = NestedKeyOf<QuoteDetailsType>;

export interface APIHeaderType {
  correlationId: string;
  recordName: string;
  recordId: string;
  consumer: string;
  provider: string;
  consumerTimestamp: string;
  testMode: string;
  info1: string;
  info2: string;
  info3: string;
  itemCategory: string;
  reasonForRejection: string;
  poType: string;
  poSubType: string;
}

export interface CommercialContractType {
  poType: string;
  isDivisionUpdated: string;
  isCustomerPurchaseOrderNumberUpdated: string;
  isBillingBlockUpdated: string;
  isBillingBlockDescUpdated: string;
  bookedBy: string;
  isBookedByUpdated: string;
  bookedTimestamp: string;
  isCfdValidated: string | 'Yes';
  isPoAcknowledged: string | 'Yes';
  isHeaderUpdated: string | 'Yes';
  contractNumber: string;
  description: string;
  fileName: string;
  quoteReferenceNumber: string;
  displayOnUi: string;
  salesOrgId: string;
  division: string;
  poDate: string;
  customerPurchaseOrderNumber: string;
  isPoTypeUpdated: string | null;
  accountCountry: string;
  currency: string;
  netValueOfContract: string;
  customerAcceptanceDate: string;
  contractStartDate: string;
  isContractStartDateUpdated: string;
  contractEndDate: string;
  isContractEndDateUpdated: string;
  paymentTerms: string;
  isPaymentTermsUpdated: string;
  indicator: string;
  salesDocType: string;
  contractType: string;
  contractSource: string;
  idpValStatus: string;
  idpValDesc: string;
  basicValStatus: string;
  basicValDesc: string;
  isTextsUpdated: string;
  texts: any[];
  approverName: string;
  approverEmail: string;
  billingBlock: string;
  billingBlockDesc: string;
  businessPartnerRole: BusinessPartnerRoleType[];
  isBusinessPartnerRoleUpdated: string | null;
  contractLineItems: ContractLineItemType[];
  contractCreationStatus: string;
  distributionChannel: string;
  sourceSystemHeaderId: string;
  version: string;
  updatedBy: string;
  dateFormat: string;
  currencyFormat: string;
  csbrNumber: string;
  customerGroups: any[];
  conditionGroups: any[];
  isSimulation: string;
  simulationStatus: string;
  simulationErrorLogs: SimulationErrorLogs;
  simulationTimestamp: string;
  simulationVersion: string;
  simulatedBy: string;
}

export interface SimulationErrorLogs {
  successLogs: Log[];
  errorLogs: Log[];
  warningLogs: Log[];
  infoLogs: Log[];
}

export interface Log {
  TYPE: string;
  ID: string;
  NUMBER: number;
  MESSAGE: string;
  MESSAGE_V1: null | string;
  PARAMETER: null | string;
  SYSTEM: null | string;
  MESSAGE_V2: null | string;
  ROW: number;
  MESSAGE_V3: null;
  MESSAGE_V4: null;
}

export interface BusinessPartnerRoleType {
  businessPartnerId: string;
  businessPartnerRoleId: string;
  businessPartnerDescription: string;
  address: AddressType;
  timezone: string;
  version: string;
  isBusinessPartnerUpdated: string;
}

export interface AddressType {
  isStreet1Updated: string;
  isTelephoneNumberUpdated: string;
  businessPartnerName: string;
  street1: string;
  city: string;
  region: string;
  country: string;
  postalCode: string;
  timezone: string;
  telephoneNumber: string;
}

export interface ContractLineItemType {
  customerPurchaseOrderNumber: string;
  isCustomerPurchaseOrderNumberUpdated: string;
  lineType: string;
  isBillingPeriodUpdated: string;
  isBillingBlockUpdated: string;
  isBillingDescUpdated: string;
  sapBusinessHoursName: string;
  sapBusinessHoursCode: string;
  sapPmBusinessHoursName: string;
  sapPmBusinessHoursCode: string;
  sapPriorityBusinessHoursName: string;
  sapPriorityBusinessHoursCode: string;
  sapPlannedMaintenanceName: string;
  sapPlannedMaintenanceCode: string;
  sapAdditionalPmVisitsName: string;
  sapAdditionalPmVisitsCode: string;
  sapUptimeName: string;
  sapUptimeCode: string;
  sapPartsDeliveryName: string;
  sapPartsDeliveryCode: string;
  sapServiceLevelAgreementName: string;
  sapServiceLevelAgreementCode: string;
  isPoTypeUpdated: string;
  isLineItemUpdated: string;
  isHigherLevelItem: string;
  higherLevelItemNumber: string;
  productType: string;
  businessPartnerRole: BusinessPartnerRoleType[];
  isBusinessPartnerRoleUpdated: string;
  productDescription: string;
  totalValueContractLineItem: string;
  productId: string;
  featureId: string;
  contractLineItemNumber: string;
  sourceSystemHeaderId: string;
  sourceSystemLineItemId: string;
  isTechnicalObjectsUpdated: string;
  technicalObjects: TechnicalObjectType[];
  currency: string;
  profitCenter: string;
  contractLineStartDate: string;
  isContractLineStartDateUpdated: string;
  contractLineEndDate: string;
  isContractLineEndDateUpdated: string;
  customerAcceptanceDateLineItem: Date;
  uom: string;
  quantity: string;
  pricingModel: string;
  price: string;
  priceType: string;
  contractLineItemRefNumber: string;
  isPaymentTermsUpdated: string;
  paymentTerms: string;
  billingPlanType: string;
  billingPeriod: string;
  billingPlanRule: string;
  billingBlock: string;
  billingBlockDesc: string;
  lineRejection: boolean;
  reasonForRejection: string;
  rejectionDescription: string;
  contractNumber: string;
  featureName: string;
  featureOptionId: string;
  featureOptionName: string;
  itemCategory: string;
  indexation: IndexationType;
  isTextsUpdated: string;
  texts: any[];
  materialGroups: any[];
  conditionGroups: any[];
  servicePlan: string;
  businessHoursName: string;
  businessHoursCode: string;
  pmBusinessHoursName: string;
  pmBusinessHoursCode: string;
  priorityBusinessHoursName: string;
  priorityBusinessHoursCode: string;
  renewalTermName: string;
  renewalTermCode: string;
  plannedMaintenanceName: string;
  plannedMaintenanceCode: string;
  additionalPmVisitsName: string;
  additionalPmVisitsCode: string;
  customerExperienceNotes: string;
  uptimeName: string;
  uptimeCode: string;
  partsDeliveryName: string;
  partsDeliveryCode: string;
  serviceLevelAgreementName: string;
  serviceLevelAgreementCode: string;
  serviceContract: ServiceContractType;
  systemModality: string;
  poType: string;
  characteristicConfigurations: CharacteristicConfigurationType[];
}

export interface CharacteristicConfigurationType {
  featureName: string;
  featureCode: string;
  characteristicName: string;
  characteristicValue: string;
  characteristicCode: string;
}

export interface IndexationType {
  isIndexationApplicable: boolean;
  indexUpliftStartDate: string;
  indexType: string;
  indexFormula: string;
  indexMonth: string;
  indexCustomerAcceptance: string;
  indexNoticePeriod: string;
  indexFixedDate: string;
  indexNotifyCustomer: string;
  indexInclLetter: string;
  indexCustConfirmation: string;
  sourceSystemHeaderId: string;
  sourceSystemLineItemId: string;
}

export interface ServiceContractType {
  partsDiscounts: PartsDiscountType[];
  includedServices: IncludedServiceType[];
}

export interface IncludedServiceType {
  sapIncludedServiceName: SapIncludedServiceNameType;
  sapIncludedServiceCode: string;
  serviceValue: string;
  includedServiceCode: string;
  isDeleted: string;
  serviceType: string;
  serviceName: string;
}

export enum SapIncludedServiceNameType {
  ActivitiesCovered = 'ACTIVITIES_COVERED',
  Business = 'BUSINESS',
  TMDiscounts3 = 'T_M_DISCOUNTS_3',
}

export interface PartsDiscountType {
  partsDiscount: string;
  partsDiscountCode: string;
  discountDescription: string;
  isDeleted: string;
  discountValue: string;
}

export interface TechnicalObjectType {
  equipmentNumber: string;
  mainEquipment: string;
  materialCode: string;
  materialDescription: string;
  serialNumber: string;
}

export interface RSMType {}
