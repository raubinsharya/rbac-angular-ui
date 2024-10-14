import { AbstractControl, ValidatorFn } from '@angular/forms';
import moment from 'moment';

// Custom validator for date comparison
export function dateRangeValidator(
  startDateKey: string,
  endDateKey: string
): ValidatorFn {
  return (group: AbstractControl): { [key: string]: any } | null => {
    const startDate = group.get(startDateKey)?.value;
    const endDate = group.get(endDateKey)?.value;

    if (startDate && endDate && moment(startDate).isAfter(moment(endDate))) {
      return {
        [startDateKey]: 'mismatch!',
        [endDateKey]: 'mismatch!',
      };
    }
    return null; // No error
  };
}
