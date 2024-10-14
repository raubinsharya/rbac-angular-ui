import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Store } from '@ngrx/store';
import { selectUserRoleState } from '../../../../store/selectos/user-management.selector';
import { extractInitials } from '../../../../../utils';

@Component({
  selector: 'app-app-bar-menu',
  templateUrl: './app-bar-menu.component.html',
  styleUrl: './app-bar-menu.component.scss',
})
export class AppBarMenuComponent implements OnInit {
  public userName!: string | undefined;
  public initialName!: string;
  public lastLoggedIn!: string;

  constructor(private auth: AuthService, private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectUserRoleState).subscribe((user) => {
      this.lastLoggedIn = user.userRoles[0]?.lastLoggedIn;
      this.userName = user.name;
      this.initialName = extractInitials(this.userName as string);
    });
  }

  public logout() {
    this.auth.logout();
  }
}
