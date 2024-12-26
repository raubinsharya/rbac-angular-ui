import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { DevelopmentProgressComponent } from '../../shared/components/development-progress/development-progress.component';

@Component({
  selector: 'app-contract-error-report',
  standalone: true,
  imports: [SharedModule, DevelopmentProgressComponent],
  templateUrl: './contract-error-report.component.html',
  styleUrl: './contract-error-report.component.scss',
})
export class ContractErrorReportComponent {}
