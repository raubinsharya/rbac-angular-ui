import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import moment from 'moment';

// Interface for the date filter model
export interface DateFilterModel {
  condition: string;
  selectedDate?: Date | null;
  startDate?: Date | null;
  endDate?: Date | null;
}

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateFilterComponent),
      multi: true,
    },
  ],
})
export class DateFilterComponent implements ControlValueAccessor {
  @Output() onDateFilterApplied = new EventEmitter<DateFilterModel>();

  filterForm!: FormGroup;

  private onChange: (value: DateFilterModel) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      condition: this.fb.control<string>('equals'),
      selectedDate: this.fb.control<Date | null>(new Date()),
      startDate: this.fb.control<Date | null>(null),
      endDate: this.fb.control<Date | null>(null),
    });
    this.filterForm.get('condition')?.valueChanges.subscribe((condition) => {
      this.filterForm.get('selectedDate')?.reset();
      this.filterForm.get('startDate')?.reset();
      this.filterForm.get('endDate')?.reset();
      this.updateValidators(condition);
    });
  }

  private updateValidators(condition: string): void {
    const startDateControl = this.filterForm.get('startDate');
    const endDateControl = this.filterForm.get('endDate');
    const selectedDateControl = this.filterForm.get('selectedDate');

    if (condition === 'between') {
      selectedDateControl?.clearValidators();
      startDateControl?.setValidators(Validators.required);
      endDateControl?.setValidators(Validators.required);
    } else {
      selectedDateControl?.setValidators(Validators.required);
      startDateControl?.clearValidators();
      endDateControl?.clearValidators();
    }
    startDateControl?.updateValueAndValidity();
    endDateControl?.updateValueAndValidity();
    selectedDateControl?.updateValueAndValidity();
  }

  // Called when any part of the filter changes
  onFilterChange(): void {
    const rawValue = this.filterForm.getRawValue();

    // Convert dates to local time
    const formattedValue: DateFilterModel = {
      ...rawValue,
      selectedDate: rawValue.selectedDate
        ? moment(rawValue.selectedDate).local().format('YYYY-MM-DD')
        : null,
      startDate: rawValue.startDate
        ? moment(rawValue.startDate).local().format('YYYY-MM-DD')
        : null,
      endDate: rawValue.endDate
        ? moment(rawValue.endDate).local().format('YYYY-MM-DD')
        : null,
    };

    this.onChange(formattedValue);
    this.onDateFilterApplied.emit(formattedValue);
  }

  // Clear the filter
  clearFilter(): void {
    this.filterForm.reset({
      condition: 'equals',
      selectedDate: null,
      startDate: null,
      endDate: null,
    });
    this.onFilterChange();
  }

  // Apply the filter and close the menu
  applyFilter(menuTrigger: MatMenuTrigger): void {
    if (this.filterForm.invalid) return;
    this.onFilterChange();
    menuTrigger.closeMenu();
  }

  // ControlValueAccessor methods
  writeValue(value: DateFilterModel): void {
    if (value) {
      this.filterForm.patchValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: DateFilterModel) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.filterForm.disable();
    } else {
      this.filterForm.enable();
    }
  }
}
