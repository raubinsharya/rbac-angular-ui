import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import {
  selectUser,
  selectUserState,
} from '../../../store/selectos/user.selector';
import { extractInitials } from '../../../../utils';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss',
})
export class AppBarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

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
    this.store.select(selectUser).subscribe((user) => {
      this.userName = user?.fullName;
      this.initialName = extractInitials(this.userName as string);
    });
  }

  openSidenav() {
    this.toggleSidenav.emit();
  }
}
