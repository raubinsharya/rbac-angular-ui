import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludedServicesRendererComponent } from './included-services-renderer.component';

describe('IncludedServicesRendererComponent', () => {
  let component: IncludedServicesRendererComponent;
  let fixture: ComponentFixture<IncludedServicesRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncludedServicesRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncludedServicesRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
