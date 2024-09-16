import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class ContractOverviewMainComponent {
  private constractStatusMapping: { [k: string]: string } = {
    VALIDATION: 'LISTING',
    FAILED: 'FAILED',
    TEC_ERROR: 'TECH ERROR',
  };

  private classNameMapping: { [k: string]: string } = {
    VALIDATION: 'listing',
    FAILED: 'failed',
    TEC_ERROR: 'tech-error',
    IN_PROGRESS: 'progress',
  };
}
