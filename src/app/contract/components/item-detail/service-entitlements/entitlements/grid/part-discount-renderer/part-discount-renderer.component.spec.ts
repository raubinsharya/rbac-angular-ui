import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartDiscountRendererComponent } from './part-discount-renderer.component';

describe('PartDiscountRendererComponent', () => {
  let component: PartDiscountRendererComponent;
  let fixture: ComponentFixture<PartDiscountRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartDiscountRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartDiscountRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
