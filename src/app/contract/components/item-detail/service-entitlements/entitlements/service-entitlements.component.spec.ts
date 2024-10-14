import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceEntitlementsComponent } from './service-entitlements.component';

describe('ServiceEntitlementsComponent', () => {
  let component: ServiceEntitlementsComponent;
  let fixture: ComponentFixture<ServiceEntitlementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceEntitlementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceEntitlementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
