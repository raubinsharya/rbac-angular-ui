import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineRsmComponent } from './line-rsm.component';

describe('LineRsmComponent', () => {
  let component: LineRsmComponent;
  let fixture: ComponentFixture<LineRsmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineRsmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineRsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
