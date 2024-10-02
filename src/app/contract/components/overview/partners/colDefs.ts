import {
  ColDef,
  EditableCallbackParams,
  NewValueParams,
  ValueParserParams,
} from 'ag-grid-community';
import { NotificationService } from '../../../../services/notification.service';
import {
  BusinessPartnerRoleType,
  QuoteDetailsType,
} from '../../../models/contract-overview.model';
import { isEmpty } from 'lodash';
import { Store } from '@ngrx/store';
import { fetchPartnerDetails } from '../../../store/actions/contract-overview.action';

export function getHeaderPartnerColDefs(
  isEditMode: boolean,
  notification: NotificationService,
  store: Store,
  contractOverview: QuoteDetailsType,
  soldTo: BusinessPartnerRoleType
): ColDef[] {
  const isEditable = ({
    data,
  }: EditableCallbackParams<BusinessPartnerRoleType>) =>
    isEditMode && data?.businessPartnerRoleId !== 'SP';

  return [
    {
      field: 'businessPartnerDescription',
      headerName: 'Partner Type',
      sortable: true,
      editable: false,
      minWidth: 140,
      filter: true,
      sort: 'desc',
    },
    {
      field: 'businessPartnerId',
      headerName: 'Customer No',
      sortable: true,
      minWidth: 145,
      filter: true,
      valueFormatter: ({ value }) => Number(value)?.toString() || '',
      editable: isEditable,
      cellClassRules: {
        'editable-cell': isEditable,
      },
      valueParser: ({
        newValue,
        oldValue,
      }: ValueParserParams<BusinessPartnerRoleType>) => {
        // Division should not be empty for partner
        if (isEmpty(contractOverview.commercialContract.division)) {
          notification.showError('Division is required for this operation!');
          return oldValue;
        }

        if (newValue.length > 10 || newValue.length < 8) {
          notification.showError('Length should be between 8 and 10');
          return oldValue;
        }
        return newValue;
      },
      onCellValueChanged: ({
        data,
        newValue,
      }: NewValueParams<BusinessPartnerRoleType>) => {
        store.dispatch(
          fetchPartnerDetails({
            payload: {
              customer: newValue,
              businessPartnerRoleId: data.businessPartnerRoleId,
              distributionChannel:
                contractOverview.commercialContract.distributionChannel,
              division: contractOverview.commercialContract.division,
              salesOrg: contractOverview.commercialContract.salesOrgId,
              soldTo: soldTo.businessPartnerId,
            },
          })
        );
      },
    },
    {
      field: 'address.businessPartnerName',
      headerName: 'Name',
      sortable: true,
      editable: false,
      minWidth: 100,
      filter: true,
    },
    {
      field: 'address.street1',
      headerName: 'Address',
      sortable: true,
      minWidth: 120,
      filter: true,
      editable: isEditable,
      cellClassRules: {
        'editable-cell': isEditable,
      },
      valueParser: ({ newValue, oldValue }) => {
        if (newValue.length > 35) {
          notification.showError(
            'Address should not be larger than 35 character!'
          );
          return oldValue;
        }
        return newValue;
      },
    },
    {
      field: 'address.city',
      headerName: 'City',
      sortable: true,
      editable: false,
      minWidth: 100,
      filter: true,
    },
    {
      field: 'address.region',
      headerName: 'State/Region',
      sortable: true,
      editable: false,
      minWidth: 150,
      filter: true,
    },
    {
      field: 'address.postalCode',
      headerName: 'Postal Code',
      sortable: true,
      editable: false,
      minWidth: 140,
      filter: true,
    },
    {
      field: 'address.telephoneNumber',
      headerName: 'Contact No',
      sortable: true,
      minWidth: 140,
      filter: true,
    },
    {
      field: 'address.country',
      headerName: 'Country',
      sortable: true,
      editable: false,
      minWidth: 140,
      filter: true,
    },
    {
      field: 'timezone',
      headerName: 'Time Zone',
      sortable: true,
      editable: false,
      minWidth: 120,
      filter: true,
    },
  ];
}
