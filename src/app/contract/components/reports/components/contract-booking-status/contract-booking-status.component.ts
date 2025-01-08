import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReportGridComponent } from './report-grid/report-grid.component';
import { Store } from '@ngrx/store';
import {
  selectSalesOrg,
  selectUserEmail,
} from '../../../../../store/selectos/user-management.selector';
import { CommonModule } from '@angular/common';
import { DateFilterModel } from '../../../../../shared/components/date-filter/date-filter.component';
import { fetchContractReport } from '../../store/actions/contract-report.action';

interface ReportFormType {
  userEmail: FormControl<string>;
  salesOrg: FormControl<string[]>;
  dateFilter: FormControl<DateFilterModel | null>;
}

@Component({
  selector: 'app-contract-booking-status',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    ReportGridComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './contract-booking-status.component.html',
  styleUrl: './contract-booking-status.component.scss',
})
export class ContractBookingStatusComponent {
  salesOrgs: Array<string> = [];
  reportForm: FormGroup<ReportFormType> = this.fb.group({
    userEmail: this.fb.control<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    salesOrg: this.fb.control<string[]>([], {
      nonNullable: true,
      validators: Validators.required,
    }),
    dateFilter: this.fb.control<DateFilterModel>({
      condition: 'equals',
      startDate: null,
      endDate: null,
      selectedDate: null,
    }),
  });

  constructor(private store: Store, private fb: FormBuilder) {
    this.store.select(selectSalesOrg).subscribe((salesOrg) => {
      this.salesOrgs = salesOrg;
      this.reportForm.get('salesOrg')?.setValue(salesOrg);
    });
    this.store.select(selectUserEmail).subscribe((userEmail) => {
      this.reportForm.get('userEmail')?.setValue(userEmail?.toLowerCase());
    });
  }

  handleSearch() {
    const { userEmail, salesOrg, dateFilter } = this.reportForm.value;
    this.store.dispatch(
      fetchContractReport({
        payload: {
          status: 'SUCCESS',
          bookedBy: userEmail as string,
          salesOrgIdList: salesOrg as Array<string>,
          createdDate: dateFilter?.selectedDate as Date,
          createdStartDate: dateFilter?.startDate as Date,
          createdEndDate: dateFilter?.endDate as Date,
          isAfterCreatedDate: dateFilter?.condition === 'after',
          isBeforeCreatedDate: dateFilter?.condition === 'before',
          isEqualCreatedDate: dateFilter?.condition === 'equals',
          isInBetweenCreatedDate: dateFilter?.condition === 'between',
          isNotEqualCreatedDate: dateFilter?.condition === 'notEquals',
        },
      })
    );
  }
}
