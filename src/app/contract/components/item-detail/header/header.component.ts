import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractLineItemType } from '../../../models/contract-overview.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty } from 'lodash';
import {
  selectContractOverview,
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
import { updateOverview } from '../../../store/actions/contract-overview.action';
import { EquipmentDialogComponent } from '../../../../shared/components/equipment-dialog/equipment-dialog.component';

@Component({
  selector: 'item-detail-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class ItemDetailHeaderComponent {
  isEditMode: boolean = false;
  poTypes = poTypes;
  paymentTerms = paymentTerms;
  billingPeriod = billingPeriods;
  lineItemForm!: FormGroup;
  public contractLineItem!: ContractLineItemType | undefined;
  public idx!: number;
  public totalLines!: number;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.store.select(selectContractOverview).subscribe((overview) => {
      this.totalLines = overview.commercialContract?.contractLineItems?.length;
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

  startEditMode() {
    this.toggleEditForm();
    this.isEditMode = true;
  }

  stopEditMode() {
    this.toggleEditForm();
    this.isEditMode = false;
  }

  cancelEditMode() {
    this.toggleEditForm();
    this.isEditMode = false;
  }

  toggleEditForm() {
    Object.keys(this.lineItemForm.controls).forEach((key) => {
      const control = this.lineItemForm.get(key);
      if (control?.disabled) control.enable({ onlySelf: true });
      else control?.disable({ onlySelf: true });
    });
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
            { name: 'Internal', icon: 'sms', fieldName: 'itemText' },
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
}
