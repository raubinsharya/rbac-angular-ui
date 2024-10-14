import { Inject, Injectable } from '@angular/core';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import {
  EventMessage,
  EventType,
  AuthenticationResult,
  InteractionRequiredAuthError,
  InteractionStatus,
  RedirectRequest,
} from '@azure/msal-browser';
import { filter, takeUntil } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { fetchUserRoles } from '../store/actions/user-management.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _destroy = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG)
    private msalGuardConfig: MsalGuardConfiguration,
    private msalBroadcastService: MsalBroadcastService,
    private authService: MsalService,
    private store: Store
  ) {
    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (interactionStatus: InteractionStatus) =>
            interactionStatus === InteractionStatus.None
        ),
        takeUntil(this._destroy)
      )
      .subscribe(() => {
        this.getAccessToken();
      });
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS)
      )
      .subscribe((event: EventMessage) => {
        const payload = event.payload as AuthenticationResult;
        const account = payload.account;
        this.authService.instance.setActiveAccount(account);
      });
  }

  private getAccessToken() {
    this.authService.instance.handleRedirectPromise().then(() => {
      if (this.authService.instance.getAllAccounts().length > 0) {
        this.authService.instance
          .acquireTokenSilent({
            scopes: [environment.APP_SCOPE],
          })
          .then(({ accessToken, account }) => {
            localStorage.setItem('token', accessToken);
            this.store.dispatch(
              fetchUserRoles({ email: account.username, name: account.name })
            );
            return accessToken;
          })
          .catch((error) => {
            if (error instanceof InteractionRequiredAuthError) {
              return this.authService.instance.acquireTokenRedirect({
                scopes: [environment.APP_SCOPE],
              });
            }
            return error;
          });
      }
    });
  }
  public login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else this.authService.loginRedirect();
  }
  public logout() {
    this.authService.logoutRedirect({
      postLogoutRedirectUri: environment.REDIRECT_URL,
    });
  }
}
