import { Component } from '@angular/core';

@Component({
  selector: 'contract-overview-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class ContractOverviewHeaderComponent {
  public isExpanded: boolean = true;

  isEditMode: boolean = false;

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
