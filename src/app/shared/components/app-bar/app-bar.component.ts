import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import {
  selectUserRoles,
  selectUserRoleState,
} from '../../../store/selectos/user-management.selector';
import { extractInitials } from '../../../../utils';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss',
})
export class AppBarComponent implements OnInit {
  public userName!: string | undefined;
  public initialName!: string;
  public loading!: boolean;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private store: Store
  ) {
    this.matIconRegistry.addSvgIcon(
      'philips-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/philips.svg'
      )
    );
  }

  ngOnInit(): void {
    this.store.select(selectUserRoleState).subscribe((user) => {
      this.userName = user.name;
      this.loading = user.loading;
      this.initialName = extractInitials(this.userName as string);
    });
  }
}
