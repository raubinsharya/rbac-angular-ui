import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractBookingStatusComponent } from './contract-booking-status.component';

describe('ContractBookingStatusComponent', () => {
  let component: ContractBookingStatusComponent;
  let fixture: ComponentFixture<ContractBookingStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractBookingStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractBookingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
