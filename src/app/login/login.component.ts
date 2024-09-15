import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private msalService: MsalService,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'philips-logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/philips-logo.svg'
      )
    );
  }

  public login() {
    this.auth.login();
  }
}
