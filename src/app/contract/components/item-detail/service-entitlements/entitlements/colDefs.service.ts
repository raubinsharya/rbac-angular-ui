import { ColDef } from 'ag-grid-community';
import { Injectable } from '@angular/core';
import { PartDiscountRendererComponent } from './grid/part-discount-renderer/part-discount-renderer.component';
import { IncludedServicesRendererComponent } from './grid/included-services-renderer/included-services-renderer.component';

@Injectable({
  providedIn: 'root',
})
export class LineEntitlementColDefs {
  getColDefs(): ColDef[] {
    return [
      {
        field: 'servicePlan',
        headerName: 'Service Plan',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 155,
      },
      {
        field: 'serviceContract.partsDiscounts',
        headerName: 'Part Discount',
        editable: false,
        sortable: false,
        minWidth: 125,
        cellStyle: { 'vertical-align': 'middle', 'text-align': 'center' },
        cellRenderer: PartDiscountRendererComponent,
      },
      {
        field: 'serviceContract.includedServices',
        headerName: 'Included Service',
        sortable: false,
        editable: false,
        minWidth: 145,
        cellStyle: { 'vertical-align': 'middle', 'text-align': 'center' },
        cellRenderer: IncludedServicesRendererComponent,
      },
      {
        field: 'priorityBusinessHoursName',
        headerName: 'Priority Business Hours',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 230,
        tooltipField: 'priorityBusinessHoursName',
      },
      {
        field: 'businessHoursName',
        headerName: 'Business Hours',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 175,
        tooltipField: 'businessHoursName',
      },
      {
        field: 'pmBusinessHoursName',
        headerName: 'PM Business Hours',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 205,
        tooltipField: 'pmBusinessHoursName',
      },
      {
        field: 'renewalTermName',
        headerName: 'Renewal Term',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 170,
        tooltipField: 'renewalTermName',
      },
      {
        field: 'plannedMaintenanceName',
        headerName: 'Planned Maintenance',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 220,
        tooltipField: 'plannedMaintenanceName',
      },
      {
        field: 'additionalPmVisitsName',
        headerName: 'Additional PM Visits',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 215,
        tooltipField: 'additionalPmVisitsName',
      },
      {
        field: 'uptimeCode',
        headerName: 'Up Time',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 135,
      },
      {
        field: 'serviceLevelAgreementName',
        headerName: 'SLA',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 105,
        tooltipField: 'serviceLevelAgreementName',
      },
      {
        field: 'partsDeliveryName',
        headerName: 'Parts Delivery',
        sortable: true,
        filter: true,
        editable: false,
        minWidth: 170,
        tooltipField: 'partsDeliveryName',
      },
    ];
  }
}
