import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemNumberRendererComponent } from './item-number-renderer.component';

describe('ItemNumberRendererComponent', () => {
  let component: ItemNumberRendererComponent;
  let fixture: ComponentFixture<ItemNumberRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemNumberRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemNumberRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
