import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HyperlinkcellrenderComponent } from './hyperlinkcellrender.component';

describe('HyperlinkcellrenderComponent', () => {
  let component: HyperlinkcellrenderComponent;
  let fixture: ComponentFixture<HyperlinkcellrenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HyperlinkcellrenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyperlinkcellrenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
