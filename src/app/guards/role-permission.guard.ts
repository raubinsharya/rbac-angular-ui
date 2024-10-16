import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { exhaustMap, filter, from, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectRoles } from '../store/selectos/user-management.selector';
import { isEmpty } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class PermissionsGuardWithRoles implements CanActivate {
  constructor(
    private store: Store,
    private ngxPermissionsGuard: NgxPermissionsGuard
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(
      select(selectRoles),
      filter((roles) => !isEmpty(roles)),
      exhaustMap(() => {
        return from(
          this.ngxPermissionsGuard.canActivate(route, state) as Promise<boolean>
        );
      })
    );
  }
}
