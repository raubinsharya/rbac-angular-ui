import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../store/selectos/user.selector';
import { extractInitials } from '../../../../utils';

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
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
    private readonly store: Store
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
