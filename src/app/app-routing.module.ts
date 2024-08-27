import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [MsalGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledNonBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
