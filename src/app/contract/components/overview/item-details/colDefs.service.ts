import { ColDef, ValueFormatterParams } from 'ag-grid-community';
import {
  CustomDropDownComponent,
  DropdownRendererParams,
} from '../../../../shared/components/grid/custom-drop-down/custom-drop-down.component';
import {
  billingInAdvance,
  billingPeriods,
  mergeApplicable,
  paymentTerms,
} from '../../../../shared/constants';
import { GridTextCellRendererComponent } from './grid/text-cell-renderer/text-cell-renderer.component';
import { GridItemNumberRendererComponent } from './grid/item-number-renderer/item-number-renderer.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { CurrencyPipe } from '@angular/common';
import {
  CommercialContractType,
  ContractLineItemType,
} from '../../../models/contract-overview.model';
import { Store } from '@ngrx/store';
import { updateOverview } from '../../../store/actions/contract-overview.action';
import { NumberOfEquipmentsCellRenderer } from './grid/number-of-equipments/number-of-equipments.component';

export const booleanFormatter = (params: any) => {
  return params.value ? 'Yes' : 'No';
};
export const arrayFormatter = (params: any) => {
  return Array.isArray(params.value) ? params.value.length : 0;
};

@Injectable({
  providedIn: 'root',
})
export class ItemDetailsColDefs {
  constructor(
    private matDialog: MatDialog,
    private currencyPipe: CurrencyPipe,
    private store: Store
  ) {}

  private openConfirmationDialog({
    title,
    description,
    field,
    newValue,
  }: {
    title: string;
    description: string;
    field: string;
    newValue: string;
  }) {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      minWidth: '400px',
      data: { title, description },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.store.dispatch(
        updateOverview({
          query: `$.commercialContract.contractLineItems[*]`,
          targetFields: [{ field: field, value: newValue }],
        })
      );
    });
  }

  getColDefs(): ColDef[] {
    return [
      {
        field: 'texts',
        headerName: 'Text',
        sortable: false,
        editable: false,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        cellRenderer: GridTextCellRendererComponent,
      },
      {
        field: 'contractLineItemNumber',
        headerName: 'Item No',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 130,
        cellRenderer: GridItemNumberRendererComponent,
      },
      {
        field: 'isHigherLevelItem',
        headerName: 'Higher Level Item',
        sortable: true,
        filter: 'agSetColumnFilter',
        filterParams: {
          values: ['Active', 'Inactive', 'Pending', 'Archived'],
        },
        editable: false,
        minWidth: 205,
        valueFormatter: booleanFormatter,
      },
      {
        field: 'productId',
        headerName: 'Product Code',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 180,
      },
      {
        field: 'systemModality',
        headerName: 'System Modality',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 200,
      },
      {
        field: 'quantity',
        headerName: 'Quantity',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 140,
      },
      {
        field: 'uom',
        headerName: 'UOM',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 120,
      },
      {
        field: 'productDescription',
        headerName: 'Description',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 170,
      },
      {
        field: 'billingPeriod',
        headerName: 'Billing Period',
        sortable: true,
        filter: true,
        minWidth: 170,
        cellRenderer: CustomDropDownComponent,
        cellRendererParams: {
          values: billingPeriods,
          displayKey: 'description',
          valueKey: 'value',
        } as DropdownRendererParams,
        onCellValueChanged: ({ colDef, newValue }) => {
          this.openConfirmationDialog({
            title: colDef.headerName as string,
            description: 'Would you like to copy to all line items?',
            field: colDef.field as string,
            newValue,
          });
        },
      },
      {
        field: 'billingInAdvance',
        headerName: 'Billing in Advance',
        sortable: true,
        filter: true,
        minWidth: 200,
        editable: false,
        cellRenderer: CustomDropDownComponent,
        cellRendererParams: {
          values: billingInAdvance,
          displayKey: 'description',
          valueKey: 'value',
        } as DropdownRendererParams,
        onCellValueChanged: ({ colDef, newValue }) => {
          this.openConfirmationDialog({
            title: colDef.headerName as string,
            description: 'Would you like to copy to all line items?',
            field: colDef.field as string,
            newValue,
          });
        },
      },
      {
        field: 'isMergeApplicable',
        headerName: 'Merge Applicable',
        sortable: true,
        filter: true,
        minWidth: 200,
        editable: false,
        cellRenderer: CustomDropDownComponent,
        cellRendererParams: {
          values: mergeApplicable,
          displayKey: 'description',
          valueKey: 'value',
        } as DropdownRendererParams,
        onCellValueChanged: ({ colDef, newValue }) => {
          this.openConfirmationDialog({
            title: colDef.headerName as string,
            description: 'Would you like to copy to all line items?',
            field: colDef.field as string,
            newValue,
          });
        },
      },
      {
        field: 'paymentTerms',
        headerName: 'Payment Terms',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 180,
        cellRenderer: CustomDropDownComponent,
        cellRendererParams: {
          values: paymentTerms,
          displayKey: 'value',
          valueKey: 'value',
        } as DropdownRendererParams,
        onCellValueChanged: ({ colDef, newValue }) => {
          this.openConfirmationDialog({
            title: colDef.headerName as string,
            description: 'Would you like to copy to all line items?',
            field: colDef.field as string,
            newValue,
          });
        },
      },
      {
        field: 'technicalObjects',
        headerName: 'No of Equipments',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 210,
        cellRenderer: NumberOfEquipmentsCellRenderer,
      },
      {
        field: 'contractLineStartDate',
        headerName: 'Start Date',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 160,
      },
      {
        field: 'contractLineEndDate',
        headerName: 'End Date',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 160,
      },
      {
        field: 'currency',
        headerName: 'Currency',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 160,
      },
      {
        field: 'price',
        headerName: 'Monthly/Yearly',
        sortable: true,
        filter: 'agNumberColumnFilter',
        editable: false,
        minWidth: 180,
        valueFormatter: ({
          value,
        }: ValueFormatterParams<ContractLineItemType>) => {
          return String(this.currencyPipe.transform(value || '123', 'USD'));
        },
      },
      {
        field: 'priceType',
        headerName: 'Condition Type',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 175,
      },
      {
        field: 'billingPlanType',
        headerName: 'Billing Plan Type',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 205,
      },
      {
        field: 'billingPlanRule',
        headerName: 'Billing Plan Rule',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 180,
      },
    ];
  }
}
