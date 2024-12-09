import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRoleDialogComponent } from './view-role-dialog.component';

describe('ViewRoleDialogComponent', () => {
  let component: ViewRoleDialogComponent;
  let fixture: ComponentFixture<ViewRoleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRoleDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRoleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
