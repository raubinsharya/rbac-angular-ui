import { Component } from '@angular/core';
import { DevelopmentProgressComponent } from '../../shared/components/development-progress/development-progress.component';

@Component({
  selector: 'app-contract-change-log',
  standalone: true,
  imports: [DevelopmentProgressComponent],
  templateUrl: './contract-change-log.component.html',
  styleUrl: './contract-change-log.component.scss'
})
export class ContractChangeLogComponent {

}
