import { Component } from '@angular/core';
import { SharedModule } from '../../../../../../shared/shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-development-progress',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './development-progress.component.html',
  styleUrl: './development-progress.component.scss',
})
export class DevelopmentProgressComponent {}
