import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

export interface Section {
  name: string;
  url: string;
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
      url: '/users',
    },
    {
      name: 'Roles',
      url: '/roles',
    },
    {
      name: 'Permissions',
      url: '/permissions',
    },
  ];

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
