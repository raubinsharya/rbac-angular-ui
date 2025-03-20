import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../store/selectos/user.selector';
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

  constructor(private store: Store) {
    this.store.select(selectUser).subscribe((user) => {
      this.userName = user?.fullName;
      this.initialName = extractInitials(this.userName as string);
    });
  }

  ngOnInit(): void {}

  public logout() {}
}
