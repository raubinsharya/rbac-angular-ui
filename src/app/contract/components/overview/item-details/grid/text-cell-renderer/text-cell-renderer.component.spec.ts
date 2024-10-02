import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextCellRendererComponent } from './text-cell-renderer.component';

describe('TextCellRendererComponent', () => {
  let component: TextCellRendererComponent;
  let fixture: ComponentFixture<TextCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextCellRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
