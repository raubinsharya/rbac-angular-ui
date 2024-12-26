import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractChangeLogComponent } from './contract-change-log.component';

describe('ContractChangeLogComponent', () => {
  let component: ContractChangeLogComponent;
  let fixture: ComponentFixture<ContractChangeLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractChangeLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractChangeLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
