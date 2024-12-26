import { Component } from '@angular/core';
import { SharedModule } from '../../../../../../shared/shared.module';
import { ColDef } from 'ag-grid-community';
import { ReportGridColDefs } from './colDefs.service';

@Component({
  selector: 'contract-booking-report-grid',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './report-grid.component.html',
  styleUrl: './report-grid.component.scss',
})
export class ReportGridComponent {
  public colDefs!: ColDef[];
  constructor(private colDefService: ReportGridColDefs) {
    this.colDefs = colDefService.getColDefs();
  }
}
