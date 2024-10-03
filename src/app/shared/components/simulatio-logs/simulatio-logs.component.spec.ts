import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatioLogsComponent } from './simulatio-logs.component';

describe('SimulatioLogsComponent', () => {
  let component: SimulatioLogsComponent;
  let fixture: ComponentFixture<SimulatioLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulatioLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulatioLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
