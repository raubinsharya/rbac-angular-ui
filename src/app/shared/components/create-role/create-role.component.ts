import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createRoles } from '../../../roles/store/actions/roles.action';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.scss',
})
export class SharedCreateRoleComponent {
  public readonly dialogData: { selectedData: Array<string>; userId: string } =
    inject(MAT_DIALOG_DATA);
  public selectedRowIds: Array<string> = [];

  public createRoleForm!: FormGroup;

  constructor(private readonly store: Store, private readonly fb: FormBuilder) {
    this.createRoleForm = this.fb.group({
      slug: ['', Validators.required],
      title: ['', Validators.required],
    });
  }

  createRole() {
    if (!this.createRoleForm.valid) return;
    this.store.dispatch(createRoles({ roles: [this.createRoleForm.value] }));
  }
}
