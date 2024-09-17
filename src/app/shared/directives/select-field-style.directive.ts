import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[editableSelectField]',
})
export class EditableSelectFieldDirective implements OnChanges {
  @Input() editableSelectField: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editableSelectField']) {
      if (this.editableSelectField) {
        this.renderer.addClass(this.el.nativeElement, 'custom-select');
      } else {
        this.renderer.removeClass(this.el.nativeElement, 'custom-select');
      }
    }
  }
}
