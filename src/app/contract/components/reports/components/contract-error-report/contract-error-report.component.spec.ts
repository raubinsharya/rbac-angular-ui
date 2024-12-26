import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractErrorReportComponent } from './contract-error-report.component';

describe('ContractErrorReportComponent', () => {
  let component: ContractErrorReportComponent;
  let fixture: ComponentFixture<ContractErrorReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractErrorReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractErrorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
