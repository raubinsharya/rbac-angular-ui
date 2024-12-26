import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  CommercialContractType,
  ContractLineItemType,
} from '../../../models/contract-overview.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty } from 'lodash';
import {
  selectContractOverview,
  selectContractOverviewLineIsHeaderUpdated,
  selectContractOverviewLineItem,
} from '../../../store/selectors/contract-overview.selector';
import {
  billingPeriods,
  paymentTerms,
  poTypes,
} from '../../../../shared/constants';
import { MatDialog } from '@angular/material/dialog';
import {
  MeMessageDialogComponentParams,
  MessageDialogComponent,
} from '../../../../shared/components/message-dialog/message-dialog.component';
import {
  resetOverview,
  updateOverview,
} from '../../../store/actions/contract-overview.action';
import { EquipmentDialogComponent } from '../../../../shared/components/equipment-dialog/equipment-dialog.component';
import { SimulatioLogsComponent } from '../../../../shared/components/simulatio-logs/simulatio-logs.component';
import moment from 'moment';
import { NotificationService } from '../../../../services/notification.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'item-detail-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('expandable', [
      state(
        'collapsed',
        style({
          height: '0px',
          opacity: 0,
        })
      ),
      state(
        'expanded',
        style({
          height: '*', // Automatically adjusts to content height
          opacity: 1,
        })
      ),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out'), // Duration and easing
      ]),
    ]),
  ],
})
export class ItemDetailHeaderComponent {
  commercialContract!: CommercialContractType;
  isEditMode: boolean = false;
  isExpanded: boolean = false;
  poTypes = poTypes;
  paymentTerms = paymentTerms;
  billingPeriod = billingPeriods;
  lineItemForm!: FormGroup;
  public contractLineItem!: ContractLineItemType | undefined;
  public idx!: number;
  public totalLines!: number;
  public isLineHeaderUpdated!: boolean;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private notification: NotificationService
  ) {
    this.store.select(selectContractOverview).subscribe((overview) => {
      this.commercialContract = overview?.commercialContract;
    });
    this.store.select(selectContractOverview).subscribe((overview) => {
      this.totalLines = overview.commercialContract?.contractLineItems?.length;
    });
    this.store
      .select(selectContractOverviewLineIsHeaderUpdated(this.idx))
      .subscribe((isLineHeaderUpdated) => {
        this.isLineHeaderUpdated = isLineHeaderUpdated;
      });
  }

  ngOnInit(): void {
    this.lineItemForm = this.fb.group({
      customerPurchaseOrderNumber: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
        ],
      ],
      contractLineStartDate: [
        { value: '', disabled: true },
        Validators.required,
      ],
      contractLineEndDate: [{ value: '', disabled: true }, Validators.required],
      poType: [{ value: '', disabled: true }, Validators.required],
      paymentTerms: [{ value: '', disabled: true }, Validators.required],
      billingPeriod: [{ value: '', disabled: true }, Validators.required],
    });
    this.route.paramMap.subscribe((params) => {
      this.idx = Number(params.get('idx'));
      this.store
        .select(selectContractOverviewLineItem(this.idx))
        .subscribe((result) => {
          this.contractLineItem = structuredClone(result);
          this.setFormValues(result as ContractLineItemType);
        });
    });
  }

  private setFormValues(constractLineItem: ContractLineItemType) {
    this.lineItemForm?.patchValue({
      customerPurchaseOrderNumber:
        constractLineItem.customerPurchaseOrderNumber,
      contractLineStartDate: constractLineItem.contractLineStartDate,
      contractLineEndDate: constractLineItem.contractLineEndDate,
      poType: constractLineItem.poType,
      paymentTerms: constractLineItem.paymentTerms,
      billingPeriod: constractLineItem.billingPeriod,
    });
  }

  toggleEditMode() {
    this.toggleEditForm();
  }

  startEditMode() {
    this.toggleEditMode();
    this.isEditMode = true;
  }

  stopEditMode() {
    const errors = this.getFormValidationErrors().some((error) => {
      this.notification.showError(`${error.field} ${error.keyError}`);
      const field = error.field as keyof CommercialContractType;
      this.lineItemForm.get(field)?.reset(this.commercialContract[field]);
      return !isEmpty(error);
    });

    if (errors) return;

    const targetFields = Object.keys(this.lineItemForm.value).map((key) => {
      let value = this.lineItemForm.value[key];
      if (value instanceof Date) value = moment(value).format('yyyy-MM-DD');
      return {
        field: key,
        value: value,
      };
    });

    this.store.dispatch(
      updateOverview({
        query: `$.commercialContract.contractLineItems[${this.idx}]`,
        targetFields: targetFields,
      })
    );
    this.toggleEditMode();
    this.isEditMode = false;
  }

  handleReset() {
    this.store.dispatch(
      resetOverview({
        query: `$.commercialContract.contractLineItems[${this.idx}]`,
        fields: [
          'division',
          'poType',
          'customerPurchaseOrderNumber',
          'contractLineStartDate',
          'contractLineEndDate',
          'paymentTerms',
          'billingPeriod',
        ],
      })
    );
  }

  async cancelEditMode() {
    this.toggleEditMode();
    this.setFormValues(this.contractLineItem as ContractLineItemType);
    this.isEditMode = false;
  }

  toggleEditForm() {
    Object.keys(this.lineItemForm.controls).forEach((key) => {
      const control = this.lineItemForm.get(key);
      if (control?.disabled) control.enable({ onlySelf: true });
      else control?.disable({ onlySelf: true });
    });
  }

  private getFormValidationErrors() {
    const errors: Array<{ field: string; keyError: string }> = [];
    Object.keys(this.lineItemForm.controls).forEach((key) => {
      const controlErrors: ValidationErrors = this.lineItemForm.get(key)
        ?.errors as ValidationErrors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          errors.push({
            field: key,
            keyError: keyError,
          });
        });
      }
    });
    const formErrors = this.lineItemForm.errors as any;
    if (!isEmpty(formErrors))
      Object.keys(formErrors).forEach((key) => {
        errors.push({
          field: key,
          keyError: formErrors[key],
        });
      });
    return errors;
  }

  public openMessageDialog() {
    this.dialog
      .open(MessageDialogComponent, {
        minWidth: '600px',
        minHeight: '300px',
        data: {
          title: `Line Text: ${this.contractLineItem?.contractLineItemNumber}`,
          data: this.contractLineItem?.texts,
          tabs: [
            { name: 'Internal', icon: 'security', fieldName: 'itemText' },
            {
              name: 'Customer Invoice',
              icon: 'description',
              fieldName: 'itemText',
            },
            {
              name: 'Additional Info (SMAX)',
              icon: 'domain_verification',
              fieldName: 'itemText',
            },
          ],
        } as MeMessageDialogComponentParams,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.store.dispatch(
            updateOverview({
              query: `$.commercialContract.contractLineItems[${this.idx}]`,
              targetFields: [{ field: 'texts', value: result }],
            })
          );
        }
      });
  }

  public openEquipmentDialog() {
    this.dialog
      .open(EquipmentDialogComponent, {
        minWidth: '700px',
        minHeight: '300px',
        data: {
          lineNumber: this.contractLineItem?.contractLineItemNumber,
          technicalObjects: structuredClone(
            this.contractLineItem?.technicalObjects
          ),
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.store.dispatch(
            updateOverview({
              query: `$.commercialContract.contractLineItems[${this.idx}]`,
              targetFields: [{ field: 'technicalObjects', value: result }],
            })
          );
        }
      });
  }

  openSimulationDialog() {
    this.dialog.open(SimulatioLogsComponent, {
      minWidth: '50vw',
      data: {
        simulationLogs: this.commercialContract.simulationErrorLogs,
        simulationStatus: this.commercialContract.simulationStatus,
        isSimulation: this.commercialContract.isSimulation,
      },
    });
  }

  public goToNextLine() {
    this.navigateToLine(1);
  }

  public goToPreviousLine() {
    this.navigateToLine(-1);
  }

  private navigateToLine(step: number) {
    const id = this.route.snapshot.paramMap.get('source');
    let idx = parseInt(this.route.snapshot.paramMap.get('idx') as string, 10);
    idx = Math.max(0, Math.min(idx + step, this.totalLines - 1));
    this.router.navigate([`/contract/overview/${id}/${idx}`]);
  }

  public handleExpandHeader() {
    this.isExpanded = !this.isExpanded;
  }
}
