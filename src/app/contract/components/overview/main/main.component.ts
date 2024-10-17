import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  fetchContractOverview,
  requestSimulation,
} from '../../../store/actions/contract-overview.action';
import { ActivatedRoute } from '@angular/router';
import { QuoteDetailsType } from '../../../models/contract-overview.model';
import {
  selectContractOverview,
  selectContractOverviewError,
  selectContractOverviewLoading,
  selectEquipmentLoading,
  selectSimulationLoading,
} from '../../../store/selectors/contract-overview.selector';
import {
  classNameMapping,
  constractStatusMapping,
} from '../../../../shared/constants';
import { MatDialog } from '@angular/material/dialog';
import { BookingDialogComponent } from '../../../../shared/components/booking-dialog/booking-dialog.component';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class ContractOverviewMainComponent {
  public overview!: QuoteDetailsType | null;
  public loading!: boolean;
  public error!: any;
  public quoteDetails!: QuoteDetailsType;
  public simulationLoading!: boolean;

  get contractStatus(): string {
    return constractStatusMapping[
      this.overview?.commercialContract.contractCreationStatus as string
    ];
  }
  get contractStatusClass(): string {
    return classNameMapping[
      this.overview?.commercialContract.contractCreationStatus as string
    ];
  }

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private notification: NotificationService
  ) {
    this.store
      .select(selectContractOverview)
      .subscribe((result) => (this.overview = result));
    this.store
      .select(selectContractOverviewLoading)
      .subscribe((result) => (this.loading = result));
    this.store
      .select(selectContractOverviewError)
      .subscribe((result) => (this.error = result));
    this.store
      .select(selectSimulationLoading)
      .subscribe((loading) => (this.simulationLoading = loading));
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.store.dispatch(
        fetchContractOverview({
          sourceSystemHeaderId: params.get('source') as string,
        })
      );
    });
  }

  public simulateContract() {
    this.store.dispatch(
      requestSimulation({
        payload: {
          payload: this.overview as QuoteDetailsType,
        },
      })
    );
  }

  public handleBooking() {
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      minWidth: '500px',
      minHeight: '300px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.notification.showSuccess('Contract Sent to SAP');
      }
    });
  }
}
