import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { NgxPermissionsService } from 'ngx-permissions';

export interface DropdownRendererParams {
  values: Array<any> | Array<{ [key: string]: any }>; // Mandatory: The array of values (either array of objects or simple array)
  displayKey?: string; // Optional: The key to display (required only if array of objects is used)
  valueKey?: string; // Optional: The key to use as the value (required only if array of objects is used)
  toolTipValue?: string;
  permissions?: Array<string>;
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
  public toolTipValue!: string | undefined;
  public hasPermission: boolean = true;

  private params: any; // Declare params property

  constructor(private readonly ngxPermission: NgxPermissionsService) {}

  getValue(option: any): any {
    return this.valueKey ? option[this.valueKey] : option;
  }

  getDisplay(option: any): any {
    return this.displayKey ? option[this.displayKey] : option;
  }

  getToolTipText(option: any): string {
    return this.toolTipValue ? option[this.toolTipValue] : '';
  }

  async agInit(params: ICellRendererParams & DropdownRendererParams) {
    this.selectedValue = params.value; // Initialize with the current cell value
    this.options = params.values;
    this.params = params;
    this.displayKey = params.displayKey;
    this.valueKey = params.valueKey;
    this.toolTipValue = params.toolTipValue;
    const requiredPermissions = params.permissions || [];
    if (requiredPermissions.length > 0) {
      const perms = await this.ngxPermission.hasPermission([
        ...requiredPermissions,
        'root_admin',
      ]);
      this.hasPermission = perms;
    } else this.hasPermission = true;
  }

  refresh(params: any): boolean {
    this.selectedValue = params.value;
    return true;
  }

  onValueChange(newValue: any) {
    this.params.node.setDataValue(this.params.colDef.field, newValue.value);
  }
}
