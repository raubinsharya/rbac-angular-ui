import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { cloneDeep, isEmpty } from 'lodash';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
  icon?: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.route.root);
      });
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb'];
      const show = child.snapshot.data['show'] ?? true;
      const icon = child.snapshot.data['icon'] ?? '';
      const homeRoute = child.snapshot.data['homeUrl'] ?? '';
      if (label && show) breadcrumbs.push({ label, url, icon });
      if (!isEmpty(homeRoute) && breadcrumbs.length > 0) {
        this.updateHomeBreadcrumb(homeRoute, breadcrumbs);
      }
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }

  private updateHomeBreadcrumb(
    homeRoute: string,
    breadcrumbs: Breadcrumb[]
  ): void {
    if (!isEmpty(breadcrumbs[0]) && !isEmpty(homeRoute)) {
      breadcrumbs[0]!.url = homeRoute;
    }
  }
}
