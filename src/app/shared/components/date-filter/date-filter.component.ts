import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

export interface DateFilterType {
  condition: string;
  selectedDate?: Date | null;
  startDate?: string | null;
  endDate?: string | null;
}

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrl: './date-filter.component.scss',
})
export class DateFilterComponent {
  condition: string = 'equals'; // Default filter condition
  selectedDate: string | null = null; // Selected date for single conditions
  startDate: string | null = null; // Start date for "between" condition
  endDate: string | null = null; // End date for "between" condition

  @Output() onDateFilterApplied = new EventEmitter<DateFilterType>();

  // Emit filter changes
  onFilterChange() {
    const filter = {
      condition: this.condition,
      date: this.condition === 'between' ? null : this.selectedDate,
      startDate: this.condition === 'between' ? this.startDate : null,
      endDate: this.condition === 'between' ? this.endDate : null,
    };
    this.onDateFilterApplied.emit(filter);
  }

  // Handle condition changes
  onConditionChange() {
    // Reset irrelevant fields when condition changes
    this.selectedDate = null;
    this.startDate = null;
    this.endDate = null;
    this.onFilterChange();
  }

  // Clear the filter
  clearFilter() {
    this.condition = 'equals';
    this.selectedDate = null;
    this.startDate = null;
    this.endDate = null;
    this.onFilterChange();
  }

  applyFilter(menuTrigger: MatMenuTrigger) {
    this.onFilterChange();
    menuTrigger.closeMenu();
  }
}
