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

export const fetchPartnerLoading = createSelector(
  selectContractState,
  (state) => state.overview.partnerLoading
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
