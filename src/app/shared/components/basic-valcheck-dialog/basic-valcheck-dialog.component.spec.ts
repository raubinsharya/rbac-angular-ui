import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicValcheckDialogComponent } from './basic-valcheck-dialog.component';

describe('BasicValcheckDialogComponent', () => {
  let component: BasicValcheckDialogComponent;
  let fixture: ComponentFixture<BasicValcheckDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicValcheckDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicValcheckDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
