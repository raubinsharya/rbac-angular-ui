import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { MsalGuard } from './guards/msal.guard';
import { LoginComponent } from './login/login.component';
import { AuthRedirectGuard } from './guards/auth-redirect.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'contract',
    loadChildren: () =>
      import('./contract/contract.module').then((m) => m.ContractModule),
    // canActivate: [MsalGuard, PermissionsGuardWithRoles],
    canActivate: [MsalGuard],
    data: {
      permissions: {
        only: ['system_admin_its', 'account_manager'],
        redirectTo: '/unauthorized',
      },
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthRedirectGuard],
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledNonBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
