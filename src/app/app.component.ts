import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSidenav } from '@angular/material/sidenav';
import { fetchUserProfile } from './store/actions/user.action';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  public userRoleError!: string | null;

  constructor(private readonly store: Store) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (isEmpty(token)) return;
    this.store.dispatch(fetchUserProfile());
  }
}
