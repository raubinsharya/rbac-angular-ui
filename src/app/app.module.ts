import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  NgModule,
  provideZoneChangeDetection,
  isDevMode,
  APP_INITIALIZER,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import RequestInterceptorService from '../interceptors/request';
import ResponseInterceptorService from '../interceptors/response';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { UserEffect } from './store/effects/user.effect';
import { NotificationService } from './services/notification.service';
import { UserService } from './services/user.service';
import { catchError, firstValueFrom, map, of } from 'rxjs';
import { PermissionType } from './models/permission.model';

export function loadPermissionsFactory(
  us: UserService,
  permissionsService: NgxPermissionsService
) {
  return () => {
    return firstValueFrom(
      us.fetchUserProfilePermissions().pipe(
        map((permissions: PermissionType[]) => {
          permissionsService.loadPermissions(permissions.map((p) => p.slug));
        }),
        catchError(() => {
          permissionsService.flushPermissions();
          return of(null);
        })
      )
    );
  };
}

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot([UserEffect]),
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
    NotificationService,
    UserService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadPermissionsFactory,
      deps: [UserService, NgxPermissionsService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
