import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { FormControl } from '@angular/forms';
import { ReportGridComponent } from './report-grid/report-grid.component';
import { DateFilterType } from '../../../../../shared/components/date-filter/date-filter.component';

@Component({
  selector: 'app-contract-booking-status',
  standalone: true,
  imports: [SharedModule, ReportGridComponent],
  templateUrl: './contract-booking-status.component.html',
  styleUrl: './contract-booking-status.component.scss',
})
export class ContractBookingStatusComponent {
  toppings = new FormControl('');

  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];

  public onDateFilterApplied(params: DateFilterType) {}
}
