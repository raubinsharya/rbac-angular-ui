import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[hideOnRouteMatch], [hideOnRouteStartingMatch]',
})
export class HideOnRouteDirective {
  @Input('hideOnRouteMatch') hideOnRouteMatch: string[] = [];
  @Input('hideOnRouteStartingMatch') hideOnRouteStartingMatch: string[] = [];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateView(this.router.url);
      });
  }

  ngOnInit(): void {
    this.updateView(this.router.url);
  }

  private updateView(currentRoute: string): void {
    const exactMatch = this.hideOnRouteMatch.some(
      (route) => route === currentRoute
    );
    const startMatch = this.hideOnRouteStartingMatch.some((route) =>
      currentRoute.startsWith(route)
    );
    if (exactMatch || startMatch) {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    } else this.renderer.removeStyle(this.el.nativeElement, 'display');
  }
}
