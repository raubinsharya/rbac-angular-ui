import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

export interface Section {
  name: string;
  url: string;
  icon: string;
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
      icon: 'group',
    },
    {
      name: 'Roles',
      url: '/roles',
      icon: 'badge',
    },
    {
      name: 'Permissions',
      url: '/permissions',
      icon: 'lock',
    },
  ];

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
