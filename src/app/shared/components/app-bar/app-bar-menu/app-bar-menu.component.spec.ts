import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBarMenuComponent } from './app-bar-menu.component';

describe('AppBarMenuComponent', () => {
  let component: AppBarMenuComponent;
  let fixture: ComponentFixture<AppBarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppBarMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppBarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
