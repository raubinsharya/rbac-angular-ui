import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[editableInputField]',
})
export class EditableInputFieldDirective implements OnChanges {
  @Input() editableInputField: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editableInputField']) {
      if (this.editableInputField) {
        this.renderer.addClass(
          this.el.nativeElement,
          'form-field-custom-style'
        );
      } else {
        this.renderer.removeClass(
          this.el.nativeElement,
          'form-field-custom-style'
        );
      }
    }
  }
}
