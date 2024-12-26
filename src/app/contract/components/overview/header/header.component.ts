import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  BusinessPartnerRoleType,
  CommercialContractType,
} from '../../../models/contract-overview.model';
import { Store } from '@ngrx/store';
import {
  selectContractOverview,
  selectContractOverviewHeaderPartnerSoldTo,
  selectContractOverviewIsHeaderUpdated,
} from '../../../store/selectors/contract-overview.selector';
import { divisions, paymentTerms, poTypes } from '../../../../shared/constants';
import { NotificationService } from '../../../../services/notification.service';
import {
  MeMessageDialogComponentParams,
  MessageDialogComponent,
} from '../../../../shared/components/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {
  resetOverview,
  updateOverview,
} from '../../../store/actions/contract-overview.action';
import moment from 'moment';
import { SimulatioLogsComponent } from '../../../../shared/components/simulatio-logs/simulatio-logs.component';
import { dateRangeValidator } from './validator/startDateEndDate';
import { isEmpty } from 'lodash';
import { UploadAttachmentsComponent } from '../upload-attachments/upload-attachments.component';

@Component({
  selector: 'contract-overview-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class ContractOverviewHeaderComponent implements OnInit {
  public isExpanded: boolean = false;
  public isHeaderUpdated!: boolean;
  today = new Date();
  isEditMode: boolean = false;
  commercialContract!: CommercialContractType;
  divisions = divisions;
  poTypes = poTypes;
  paymentTerms = paymentTerms;
  soldTo!: BusinessPartnerRoleType | null;
  overviewForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private notification: NotificationService,
    private dialog: MatDialog
  ) {
    this.store.select(selectContractOverview).subscribe((overview) => {
      this.commercialContract = structuredClone(overview?.commercialContract);
      this.setFormValues(this.commercialContract);
    });
    this.store
      .select(selectContractOverviewHeaderPartnerSoldTo)
      .subscribe((soldTo) => (this.soldTo = soldTo));
    this.store
      .select(selectContractOverviewIsHeaderUpdated)
      .subscribe((isUpdated) => (this.isHeaderUpdated = isUpdated));
  }
  ngOnInit(): void {
    this.overviewForm = this.fb.group(
      {
        division: [{ value: '', disabled: true }, Validators.required],
        poType: [{ value: '', disabled: true }, Validators.required],
        customerPurchaseOrderNumber: [
          { value: '', disabled: true },
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(12),
          ],
        ],
        contractStartDate: [{ value: '', disabled: true }, Validators.required],
        contractEndDate: [{ value: '', disabled: true }, Validators.required],
        paymentTerms: [{ value: '', disabled: true }, Validators.required],
      },
      {
        validator: dateRangeValidator('contractStartDate', 'contractEndDate'),
      }
    );
    this.setFormValues(this.commercialContract);
  }

  handleReset() {
    this.store.dispatch(
      resetOverview({
        query: '$.commercialContract',
        fields: [
          'division',
          'poType',
          'customerPurchaseOrderNumber',
          'contractStartDate',
          'contractEndDate',
          'paymentTerms',
          'texts',
        ],
      })
    );
  }

  private setFormValues(contract: CommercialContractType) {
    this.overviewForm?.patchValue({
      soldTo: this.soldTo?.businessPartnerId,
      division: contract.division,
      poType: contract.poType,
      customerPurchaseOrderNumber: contract.customerPurchaseOrderNumber,
      contractStartDate: contract.contractStartDate,
      contractEndDate: contract.contractEndDate,
      paymentTerms: contract.paymentTerms,
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
      this.overviewForm.get(field)?.reset(this.commercialContract[field]);
      return !isEmpty(error);
    });

    if (errors) return;

    const targetFields = Object.keys(this.overviewForm.value).map((key) => {
      let value = this.overviewForm.value[key];
      if (value instanceof Date) value = moment(value).format('yyyy-MM-DD');
      return {
        field: key,
        value: value,
      };
    });

    this.store.dispatch(
      updateOverview({
        query: '$.commercialContract',
        targetFields: targetFields,
      })
    );
    this.toggleEditMode();
    this.isEditMode = false;
  }

  async cancelEditMode() {
    this.toggleEditMode();
    this.setFormValues(this.commercialContract);
    this.isEditMode = false;
  }

  toggleEditForm() {
    Object.keys(this.overviewForm.controls).forEach((key) => {
      const control = this.overviewForm.get(key);
      if (control?.disabled) control.enable({ onlySelf: true });
      else control?.disable({ onlySelf: true });
    });
  }

  private getFormValidationErrors() {
    const errors: Array<{ field: string; keyError: string }> = [];
    Object.keys(this.overviewForm.controls).forEach((key) => {
      const controlErrors: ValidationErrors = this.overviewForm.get(key)
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
    const formErrors = this.overviewForm.errors as any;
    if (!isEmpty(formErrors))
      Object.keys(formErrors).forEach((key) => {
        errors.push({
          field: key,
          keyError: formErrors[key],
        });
      });
    return errors;
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
  openHeaderText() {
    this.dialog
      .open(MessageDialogComponent, {
        minWidth: '600px',
        minHeight: '300px',
        data: {
          title: `Header Text`,
          data: this.commercialContract.texts,
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
              query: '$.commercialContract',
              targetFields: [{ field: 'texts', value: result }],
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

  public openUploadAttachments() {
    this.dialog.open(UploadAttachmentsComponent, {
      minWidth: 550,
      minHeight: 300,
    });
  }
}
