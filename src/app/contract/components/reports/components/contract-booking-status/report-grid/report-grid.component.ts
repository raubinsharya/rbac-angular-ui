import { Component } from '@angular/core';
import { SharedModule } from '../../../../../../shared/shared.module';
import { ColDef } from 'ag-grid-community';
import { ReportGridColDefs } from './colDefs.service';
import { Store } from '@ngrx/store';
import {
  selecContractBookingStatus,
  selecContractBookingStatusLoading,
} from '../../../store/selectors/contract-report.selector';
import { ContractBookingStatusModel } from '../../../models/contract-booking-status.model';

@Component({
  selector: 'contract-booking-report-grid',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './report-grid.component.html',
  styleUrl: './report-grid.component.scss',
})
export class ReportGridComponent {
  public colDefs!: ColDef[];
  public rowData!: ContractBookingStatusModel[];
  public loading!: boolean;

  constructor(private colDefService: ReportGridColDefs, private store: Store) {
    this.colDefs = this.colDefService.getColDefs();
    this.store
      .select(selecContractBookingStatus)
      .subscribe((reportData) => (this.rowData = reportData));
    this.store
      .select(selecContractBookingStatusLoading)
      .subscribe((loading) => (this.loading = loading));
  }
}
