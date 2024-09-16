import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-hyperlinkcellrender',
  templateUrl: './hyperlinkcellrender.component.html',
  styleUrl: './hyperlinkcellrender.component.scss',
})
export class HyperlinkcellrenderComponent {
  public poNumber!: number;
  public sourceSystemHeaderId!: number;

  agInit(params: ICellRendererParams): void {
    this.poNumber = params.valueFormatted
      ? params.valueFormatted
      : params.value;
    this.sourceSystemHeaderId = params.data.sourceSystemHeaderId;
  }
}
