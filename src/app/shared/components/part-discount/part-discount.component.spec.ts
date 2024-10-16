import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartDiscountComponent } from './part-discount.component';

describe('PartDiscountComponent', () => {
  let component: PartDiscountComponent;
  let fixture: ComponentFixture<PartDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartDiscountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
