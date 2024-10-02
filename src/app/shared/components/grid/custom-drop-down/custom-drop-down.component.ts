import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

export interface DropdownRendererParams {
  values: Array<any> | Array<{ [key: string]: any }>; // Mandatory: The array of values (either array of objects or simple array)
  displayKey?: string; // Optional: The key to display (required only if array of objects is used)
  valueKey?: string; // Optional: The key to use as the value (required only if array of objects is used)
}

@Component({
  selector: 'app-custom-drop-down',
  templateUrl: './custom-drop-down.component.html',
  styleUrl: './custom-drop-down.component.scss',
})
export class CustomDropDownComponent {
  public selectedValue!: string;
  public options!: any[];
  public displayKey!: string | undefined;
  public valueKey!: string | undefined;

  private params: any; // Declare params property

  getValue(option: any): any {
    return this.valueKey ? option[this.valueKey] : option;
  }

  getDisplay(option: any): any {
    return this.displayKey ? option[this.displayKey] : option;
  }

  agInit(params: ICellRendererParams & DropdownRendererParams): void {
    this.selectedValue = params.value; // Initialize with the current cell value
    this.options = params.values;
    this.params = params;
    this.displayKey = params.displayKey;
    this.valueKey = params.valueKey;
  }

  refresh(params: any): boolean {
    this.selectedValue = params.value;
    return true;
  }

  onValueChange(newValue: any) {
    this.params.node.setDataValue(this.params.colDef.field, newValue.value);
  }
}
