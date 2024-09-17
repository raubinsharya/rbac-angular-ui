export interface QuoteDetailsType {
  isUpdated: null | 'Yes';
  commercialContract: CommercialContractType;
  rsmDetails: any[];
  APIHeader: APIHeaderType;
}

export interface APIHeaderType {
  correlationID: string;
  recordName: string;
  recordID: string;
  consumer: null;
  provider: string;
  consumerTimestamp: null;
  testMode: null;
  info1: null;
  info2: null;
  info3: string;
  itemCategory: null;
  reasonForRejection: null;
  poType: string;
  poSubType: null;
}

export interface CommercialContractType {
  isDivisionUpdated: null;
  isCustomerPurchaseOrderNumberUpdated: null;
  isBillingBlockUpdated: null;
  isBillingBlockDescUpdated: null;
  bookedBy: null;
  isBookedByUpdated: null;
  bookedTimestamp: null;
  isCfdValidated: null | 'Yes';
  isPoAcknowledged: null | 'Yes';
  isHeaderUpdated: null | 'Yes';
  contractNumber: string;
  description: string;
  fileName: string;
  quoteReferenceNumber: string;
  displayOnUi: string;
  salesOrgID: string;
  division: string;
  poDate: string;
  customerPurchaseOrderNumber: string;
  accountCountry: string;
  currency: string;
  netValueOfContract: string;
  customerAcceptanceDate: string;
  contractStartDate: string;
  isContractStartDateUpdated: null;
  contractEndDate: string;
  isContractEndDateUpdated: null;
  paymentTerms: string;
  isPaymentTermsUpdated: null;
  indicator: string;
  salesDocType: string;
  contractType: string;
  contractSource: string;
  idpValStatus: string;
  idpValDesc: null;
  basicValStatus: string;
  basicValDesc: string;
  isTextsUpdated: null;
  texts: any[];
  approverName: string;
  approverEmail: string;
  billingBlock: string;
  billingBlockDesc: string;
  businessPartnerRole: BusinessPartnerRoleType[];
  contractLineItems: ContractLineItemType[];
  contractCreationStatus: string;
  distributionChannel: string;
  sourceSystemHeaderId: string;
  version: string;
  updatedBy: null;
  dateFormat: string;
  currencyFormat: string;
  csbrNumber: string;
  customerGroups: any[];
  conditionGroups: any[];
  isSimulation: string;
  simulationStatus: null;
  simulationErrorLogs: null;
  simulationTimestamp: null;
  simulationVersion: null;
}

export interface BusinessPartnerRoleType {
  businessPartnerID: string;
  businessPartnerRoleID: string;
  businessPartnerDescription: string;
  address: AddressType;
  timezone: null;
  version: string;
  isBusinessPartnerUpdated: null;
}

export interface AddressType {
  isStreet1Updated: null;
  isTelephoneNumberUpdated: null;
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
  isCustomerPurchaseOrderNumberUpdated: null;
  lineType: string;
  isBillingPeriodUpdated: null;
  isBillingBlockUpdated: null;
  isBillingDescUpdated: null;
  sapBusinessHoursName: string;
  sapBusinessHoursCode: string;
  sapPmBusinessHoursName: null;
  sapPmBusinessHoursCode: null;
  sapPriorityBusinessHoursName: null;
  sapPriorityBusinessHoursCode: null;
  sapPlannedMaintenanceName: string;
  sapPlannedMaintenanceCode: string;
  sapAdditionalPmVisitsName: string;
  sapAdditionalPmVisitsCode: string;
  sapUptimeName: null;
  sapUptimeCode: null;
  sapPartsDeliveryName: null;
  sapPartsDeliveryCode: null;
  sapServiceLevelAgreementName: null;
  sapServiceLevelAgreementCode: null;
  isPoTypeUpdated: null;
  isLineItemUpdated: null;
  isHigherLevelItem: string;
  higherLevelItemNumber: string;
  productType: string;
  businessPartnerRole: BusinessPartnerRoleType[];
  productDescription: string;
  totalValueContractLineItem: string;
  productID: string;
  featureID: string;
  contractLineItemNumber: string;
  sourceSystemHeaderId: string;
  sourceSystemLineItemId: string;
  isTechnicalObjectsUpdated: null;
  technicalObjects: TechnicalObjectType[];
  currency: string;
  profitCenter: null;
  contractLineStartDate: string;
  isContractStartDateUpdated: null;
  contractLineEndDate: string;
  isContractEndDateUpdated: null;
  customerAcceptanceDateLineItem: Date;
  uom: string;
  quantity: string;
  pricingModel: string;
  price: string;
  priceType: string;
  contractLineItemRefNumber: string;
  isPaymentTermsUpdated: null;
  paymentTerms: string;
  billingPlanType: string;
  billingPeriod: string;
  billingPlanRule: string;
  billingBlock: string;
  billingBlockDesc: string;
  lineRejection: boolean;
  reasonForRejection: string;
  rejectionDescription: string;
  contractNumber: null;
  featureName: string;
  featureOptionID: string;
  featureOptionName: string;
  itemCategory: string;
  indexation: IndexationType;
  isTextsUpdated: null;
  texts: any[];
  materialGroups: any[];
  conditionGroups: any[];
  servicePlan: string;
  businessHoursName: string;
  businessHoursCode: string;
  pmBusinessHoursName: string;
  pmBusinessHoursCode: string;
  priorityBusinessHoursName: null;
  priorityBusinessHoursCode: null;
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
  featureName: null;
  featureCode: null;
  characteristicName: string;
  characteristicValue: null;
  characteristicCode: string;
}

export interface IndexationType {
  isIndexationApplicable: boolean;
  indexUpliftStartDate: null;
  indexType: null;
  indexFormula: null;
  indexMonth: null;
  indexCustomerAcceptance: null;
  indexNoticePeriod: null;
  indexFixedDate: null;
  indexNotifyCustomer: null;
  indexInclLetter: null;
  indexCustConfirmation: null;
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
  includedServiceCode: null;
  isDeleted: null;
  serviceType: null;
  serviceName: string;
}

export enum SapIncludedServiceNameType {
  ActivitiesCovered = 'ACTIVITIES_COVERED',
  Business = 'BUSINESS',
  TMDiscounts3 = 'T_M_DISCOUNTS_3',
}

export interface PartsDiscountType {
  partsDiscount: null;
  partsDiscountCode: null;
  discountDescription: string;
  isDeleted: null;
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
