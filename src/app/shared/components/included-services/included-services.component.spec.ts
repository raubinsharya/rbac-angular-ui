import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludedServicesComponent } from './included-services.component';

describe('IncludedServicesComponent', () => {
  let component: IncludedServicesComponent;
  let fixture: ComponentFixture<IncludedServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncludedServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncludedServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
