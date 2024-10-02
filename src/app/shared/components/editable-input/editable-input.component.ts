import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-editable-input',
  templateUrl: './editable-input.component.html',
  styleUrl: './editable-input.component.scss',
})
export class EditableInputComponent {
  @Input() value: string = 'Test value';
  @Input() showClearBtn: boolean = false;
  @Input() isEditMode: boolean = false;
}
