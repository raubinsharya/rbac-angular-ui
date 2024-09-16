import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-contractstatus',
  templateUrl: './contractstatus.component.html',
  styleUrl: './contractstatus.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class ContractstatusRenderComponent {
  public contractStatus!: string;
  public className!: string;

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

  agInit(params: ICellRendererParams): void {
    this.contractStatus =
      this.constractStatusMapping[params.value] ?? params.value;
    this.className = this.classNameMapping[params.value] ?? 'default';
  }
}
