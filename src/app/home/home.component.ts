import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

export interface Section {
  name: string;
}

@Component({
  selector: 'contract-app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  folders: Section[] = [
    {
      name: 'Users',
    },
    {
      name: 'Roles',
    },
    {
      name: 'Permissions',
    },
  ];

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
