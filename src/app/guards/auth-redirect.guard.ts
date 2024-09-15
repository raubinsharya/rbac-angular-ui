import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { filter } from 'rxjs/operators';
import { EventType, AuthenticationResult } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root',
})
export class AuthRedirectGuard implements CanActivate {
  constructor(
    private msalService: MsalService,
    private router: Router,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  canActivate(): boolean {
    this.msalBroadcastService.msalSubject$
      .pipe(filter((msg) => msg.eventType === EventType.LOGIN_SUCCESS))
      .subscribe((result) => {
        const authResult = result.payload as AuthenticationResult;

        if (authResult.account) {
          this.router.navigate(['/']);
        }
      });

    const isAuthenticated =
      this.msalService.instance.getAllAccounts().length > 0;

    if (isAuthenticated) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
