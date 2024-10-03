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
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderPartnerColDefs {
  private isEdit!: boolean;

  constructor(
    private notification: NotificationService,
    private store: Store
  ) {}

  getColDefs(
    contractOverview: QuoteDetailsType,
    soldTo: BusinessPartnerRoleType,
    isEdit: boolean
  ): ColDef[] {
    this.isEdit = isEdit;
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
        editable: this.isEditable,
        cellClassRules: {
          'editable-cell': this.isEditable,
        },
        valueParser: ({
          newValue,
          oldValue,
        }: ValueParserParams<BusinessPartnerRoleType>) => {
          if (isEmpty(contractOverview.commercialContract.division)) {
            this.notification.showError(
              'Division is required for this operation!'
            );
            return oldValue;
          }

          if (newValue.length > 10 || newValue.length < 8) {
            this.notification.showError('Length should be between 8 and 10');
            return oldValue;
          }
          return newValue;
        },
        onCellValueChanged: ({
          data,
          newValue,
        }: NewValueParams<BusinessPartnerRoleType>) => {
          this.store.dispatch(
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
        editable: this.isEditable,
        cellClassRules: {
          'editable-cell': this.isEditable,
        },
        valueParser: ({ newValue, oldValue }) => {
          if (newValue.length > 35) {
            this.notification.showError(
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

  isEditable = ({ data }: EditableCallbackParams<BusinessPartnerRoleType>) =>
    this.isEdit && data?.businessPartnerRoleId !== 'SP';
}
