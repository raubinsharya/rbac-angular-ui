import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedViewPermissionsComponent } from './shared-view-permissions.component';

describe('SharedViewPermissionsComponent', () => {
  let component: SharedViewPermissionsComponent;
  let fixture: ComponentFixture<SharedViewPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedViewPermissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedViewPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
