import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatter',
})
export class NumberFormatterPipe implements PipeTransform {
  transform(value: string | undefined): number {
    const parsed = Number(value);
    return isNaN(parsed) ? 0 : parsed;
  }
}
