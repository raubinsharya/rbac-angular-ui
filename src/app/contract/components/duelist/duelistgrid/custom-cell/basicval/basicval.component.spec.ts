import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicvalComponent } from './basicval.component';

describe('BasicvalComponent', () => {
  let component: BasicvalComponent;
  let fixture: ComponentFixture<BasicvalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicvalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
