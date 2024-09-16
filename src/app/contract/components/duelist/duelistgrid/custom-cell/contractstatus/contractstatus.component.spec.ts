import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractstatusComponent } from './contractstatus.component';

describe('ContractstatusComponent', () => {
  let component: ContractstatusComponent;
  let fixture: ComponentFixture<ContractstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractstatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
