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
  selectIsContractUpdated,
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
  public isContractUpdated!: boolean;

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
    this.store
      .select(selectIsContractUpdated)
      .subscribe((updated) => (this.isContractUpdated = updated));
  }

  get simulationBtnDisabledAndToolTipText(): {
    disabled: boolean;
    toolTipText: string;
  } {
    const status = this.getContractStatusDetails(
      'Simulation',
      'Simulation Disabled since Basic Validation Failed!',
      'Simulation Already Done!',
      'Simulate Contract'
    );

    // Add specific logic for simulation if needed
    if (this.overview?.commercialContract?.contractCreationStatus === 'Booked') {
      return {
        disabled: true,
        toolTipText: 'Contract Already Sent To SAP or Booked',
      };
    }

    return status;
  }

  get bookingBtnDisabledAndToolTipText(): {
    disabled: boolean;
    toolTipText: string;
  } {
    return this.getContractStatusDetails(
      'Booking',
      'Booking Disabled since Basic Validation Failed!',
      'Contract Already Sent To SAP or Booked',
      'Book Contract'
    );
  }

  private getContractStatusDetails(
    action: 'Simulation' | 'Booking',
    valFailedMessage: string,
    doneMessage: string,
    defaultMessage: string
  ): { disabled: boolean; toolTipText: string } {
    const { basicValStatus, isSimulation, contractCreationStatus } =
      this.overview?.commercialContract || {};

    // Common validation for basicValStatus
    if (basicValStatus === 'VAL_FAILED' && !this.isContractUpdated) {
      return {
        disabled: true,
        toolTipText: valFailedMessage,
      };
    }

    // Action-specific logic
    if (
      action === 'Simulation' &&
      isSimulation === 'TRUE' &&
      !this.isContractUpdated
    ) {
      return {
        disabled: true,
        toolTipText: doneMessage,
      };
    }

    if (contractCreationStatus === 'Booked') {
      return {
        disabled: true,
        toolTipText: action === 'Simulation' ? '' : doneMessage,
      };
    }

    // Default state
    return {
      disabled: false,
      toolTipText: defaultMessage,
    };
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const sourceSystemHeaderId: string = params.get('source') as string;
      if (
        this.isContractUpdated &&
        this.overview?.commercialContract.sourceSystemHeaderId ===
          sourceSystemHeaderId
      )
        return;
      this.store.dispatch(
        fetchContractOverview({
          sourceSystemHeaderId,
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
