import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  APP_INITIALIZER,
  NgModule,
  provideZoneChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import {
  MsalModule,
  MsalService,
  MsalGuard,
  MsalBroadcastService,
  MsalRedirectComponent,
} from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';

import { AppComponent } from './app.component';
import { msalInstance } from '../config/auth.config';
import { AuthService } from '../services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import RequestInterceptorService from '../interceptors/request';
import ResponseInterceptorService from '../interceptors/response';

export function initializeAuthService(
  authService: AuthService
): () => Promise<void> {
  return (): Promise<void> => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule.forRoot(
      msalInstance,
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ['user.read'],
        },
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          ['https://graph.microsoft.com/v1.0/me', ['user.read']],
          ['https://api.myapplication.com/users/*', ['customscope.read']],
          ['http://localhost:3000/profile', null],
        ]),
      }
    ),
  ],
  providers: [
    provideHttpClient(
      withInterceptors([RequestInterceptorService, ResponseInterceptorService])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuthService,
      deps: [AuthService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
