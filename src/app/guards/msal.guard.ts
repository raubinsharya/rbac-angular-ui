import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root',
})
export class MsalGuard implements CanActivate {
  constructor(private msalService: MsalService, private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated =
      this.msalService.instance.getAllAccounts().length > 0;

    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
