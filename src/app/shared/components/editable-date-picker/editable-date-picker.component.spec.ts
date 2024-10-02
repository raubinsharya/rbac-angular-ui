import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableDatePickerComponent } from './editable-date-picker.component';

describe('EditableDatePickerComponent', () => {
  let component: EditableDatePickerComponent;
  let fixture: ComponentFixture<EditableDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableDatePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
