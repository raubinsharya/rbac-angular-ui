import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfEquipmentsComponent } from './number-of-equipments.component';

describe('NumberOfEquipmentsComponent', () => {
  let component: NumberOfEquipmentsComponent;
  let fixture: ComponentFixture<NumberOfEquipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberOfEquipmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberOfEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
