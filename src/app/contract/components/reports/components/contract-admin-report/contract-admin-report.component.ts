import { Component } from '@angular/core';
import { DevelopmentProgressComponent } from '../../shared/components/development-progress/development-progress.component';

@Component({
  selector: 'app-contract-admin-report',
  standalone: true,
  imports: [DevelopmentProgressComponent],
  templateUrl: './contract-admin-report.component.html',
  styleUrl: './contract-admin-report.component.scss'
})
export class ContractAdminReportComponent {

}
