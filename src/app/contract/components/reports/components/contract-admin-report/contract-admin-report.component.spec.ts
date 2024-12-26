import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractAdminReportComponent } from './contract-admin-report.component';

describe('ContractAdminReportComponent', () => {
  let component: ContractAdminReportComponent;
  let fixture: ComponentFixture<ContractAdminReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractAdminReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractAdminReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
