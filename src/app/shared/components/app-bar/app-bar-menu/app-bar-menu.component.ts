import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-app-bar-menu',
  templateUrl: './app-bar-menu.component.html',
  styleUrl: './app-bar-menu.component.scss',
})
export class AppBarMenuComponent {
  constructor(private auth: AuthService) {}

  public logout() {
    this.auth.logout();
  }
}
