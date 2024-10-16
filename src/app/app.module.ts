import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  APP_INITIALIZER,
  NgModule,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgxPermissionsModule } from 'ngx-permissions';

import {
  MsalModule,
  MsalService,
  MsalBroadcastService,
  MsalRedirectComponent,
} from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';

import { AppComponent } from './app.component';
import { msalInstance } from '../config/auth.config';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import RequestInterceptorService from '../interceptors/request';
import ResponseInterceptorService from '../interceptors/response';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MsalGuard } from './guards/msal.guard';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { UserManagementEffect } from './store/effects/user-management.effect';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';

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
  declarations: [AppComponent, HomeComponent, LoginComponent],
  imports: [
    BrowserModule,
    SharedModule,
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
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot([UserManagementEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    // StoreRouterConnectingModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgxPermissionsModule.forRoot(),
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
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
