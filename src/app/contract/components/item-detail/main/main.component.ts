import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ContractLineItemType,
  QuoteDetailsType,
} from '../../../models/contract-overview.model';
import {
  classNameMapping,
  constractStatusMapping,
} from '../../../../shared/constants';
import {
  selectContractOverview,
  selectContractOverviewError,
  selectContractOverviewLineItem,
  selectContractOverviewLoading,
  selectSimulationLoading,
} from '../../../store/selectors/contract-overview.selector';
import { ActivatedRoute } from '@angular/router';
import {
  fetchContractOverview,
  requestSimulation,
} from '../../../store/actions/contract-overview.action';
import { isEmpty } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../../../services/notification.service';
import { BookingDialogComponent } from '../../../../shared/components/booking-dialog/booking-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class ContractItemDetailsMainComponent {
  public overview!: QuoteDetailsType | null;
  public contractLineItem!: ContractLineItemType | undefined;
  public simulationLoading!: boolean;
  public loading!: boolean;
  public error!: any;

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
      if (isEmpty(this.overview)) {
        this.store.dispatch(
          fetchContractOverview({
            sourceSystemHeaderId: params.get('source') as string,
          })
        );
      }
      this.store
        .select(selectContractOverviewLineItem(Number(params.get('idx'))))
        .subscribe((result) => (this.contractLineItem = result));
    });
  }

  get contractStatus(): string {
    return constractStatusMapping[
      this.overview?.commercialContract?.contractCreationStatus as string
    ];
  }
  get contractStatusClass(): string {
    return classNameMapping[
      this.overview?.commercialContract?.contractCreationStatus as string
    ];
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
