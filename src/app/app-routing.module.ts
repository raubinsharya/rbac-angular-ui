import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { ACLGuard } from './guards/acl.guard';
import { AuthRedirectGuard } from './guards/auth-redirect.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [ACLGuard],
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
    ],
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
