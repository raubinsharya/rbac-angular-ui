import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentProgressComponent } from './development-progress.component';

describe('DevelopmentProgressComponent', () => {
  let component: DevelopmentProgressComponent;
  let fixture: ComponentFixture<DevelopmentProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevelopmentProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevelopmentProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
