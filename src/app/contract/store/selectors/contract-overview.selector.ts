import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContractFeatureState } from '../reducers/index.reducer';

export const selectContractState =
  createFeatureSelector<ContractFeatureState>('contractFeature');

export const selectContractOverview = createSelector(
  selectContractState,
  (state) => state.overview.overview
);
export const selectContractOverviewError = createSelector(
  selectContractState,
  (state) => state.overview.error
);
export const selectContractOverviewLoading = createSelector(
  selectContractState,
  (state) => state.overview.loading
);

export const selectContractOverviewPartners = createSelector(
  selectContractState,
  (state) => state.overview.overview?.commercialContract?.businessPartnerRole
);
export const selectContractOverviewcontractLineItems = createSelector(
  selectContractState,
  (state) => state.overview.overview?.commercialContract?.contractLineItems
);

export const selectContractOverviewHeaderPartnerSoldTo = createSelector(
  selectContractOverviewPartners,
  (partners) => {
    const [soldToPartyNo] =
      partners.filter((item) => item.businessPartnerRoleId === 'SP') || [];
    return soldToPartyNo;
  }
);

export const selectPartnerLoading = createSelector(
  selectContractState,
  (state) => state.overview.partnerLoading
);
export const selectSimulationLoading = createSelector(
  selectContractState,
  (state) => state.overview.simulationLoading
);

export const selectEquipmentLoading = createSelector(
  selectContractState,
  (state) => state.overview.equipmentLoading
);

export const selectContractOverviewIsBusinesspartnerroleUpdated =
  createSelector(
    selectContractState,
    (state) =>
      state.overview.overview?.commercialContract
        ?.isBusinessPartnerRoleUpdated === 'Yes'
  );

export const selectContractOverviewIsHeaderUpdated = createSelector(
  selectContractState,
  (state) =>
    state.overview.overview?.commercialContract?.isDivisionUpdated === 'Yes' ||
    state.overview.overview?.commercialContract?.isPoTypeUpdated === 'Yes' ||
    state.overview.overview?.commercialContract
      ?.isCustomerPurchaseOrderNumberUpdated === 'Yes' ||
    state.overview.overview?.commercialContract?.isContractStartDateUpdated ===
      'Yes' ||
    state.overview.overview?.commercialContract?.isContractEndDateUpdated ===
      'Yes' ||
    state.overview.overview?.commercialContract?.isPaymentTermsUpdated === 'Yes'
);

export const selectContractOverviewLineItem = (idx: number) =>
  createSelector(selectContractState, (state) =>
    state.overview.overview.commercialContract?.contractLineItems?.at(idx)
  );
export const selectContractOverviewLineItemPartner = (idx: number) =>
  createSelector(
    selectContractState,
    (state) =>
      state.overview.overview.commercialContract?.contractLineItems?.at(idx)
        ?.businessPartnerRole
  );

export const selectContractOverviewLineIsHeaderUpdated = (idx: number) =>
  createSelector(selectContractState, (state) => {
    const lineItem =
      state.overview.overview.commercialContract?.contractLineItems?.at(idx);
    return (
      lineItem?.isContractLineStartDateUpdated === 'Yes' ||
      lineItem?.isContractLineEndDateUpdated === 'Yes' ||
      lineItem?.isPoTypeUpdated === 'Yes' ||
      lineItem?.isCustomerPurchaseOrderNumberUpdated === 'Yes' ||
      lineItem?.isPaymentTermsUpdated === 'Yes' ||
      lineItem?.isBillingPeriodUpdated === 'Yes'
    );
  });

export const selectContractOverviewLineIsBusinesspartnerRoleUpdated = (
  idx: number
) =>
  createSelector(
    selectContractState,
    (state) =>
      state.overview.overview.commercialContract?.contractLineItems?.at(idx)
        ?.isBusinessPartnerRoleUpdated === 'Yes'
  );

export const selectContractOverviewLinePartnerSoldTo = (idx: number) =>
  createSelector(selectContractOverviewLineItemPartner(idx), (partners) => {
    const [soldToPartyNo] =
      partners?.filter((item) => item.businessPartnerRoleId === 'SP') || [];
    return soldToPartyNo;
  });
