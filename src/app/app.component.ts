import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxPermissionsService } from 'ngx-permissions';
import { MatSidenav } from '@angular/material/sidenav';
import { fetchUserProfile } from './store/actions/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  public userRoleError!: string | null;
  constructor(
    private ngxPermission: NgxPermissionsService,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(fetchUserProfile());
  }
}
