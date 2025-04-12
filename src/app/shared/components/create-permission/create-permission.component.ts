import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createPermissions } from '../../../permissions/store/actions/permissions.action';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-permission.component.html',
  styleUrl: './create-permission.component.scss',
})
export class SharedCreatePermissionComponent {
  public createPermissionForm!: FormGroup;

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly ngxPermission: NgxPermissionsService
  ) {
    this.createPermissionForm = this.fb.group({
      slug: ['', Validators.required],
      title: ['', Validators.required],
    });
  }

  createPermissions() {
    if (!this.createPermissionForm.valid) return;
    this.ngxPermission
      .hasPermission(['root_admin', 'create_permissions'])
      .then((has) => {
        if (has)
          this.store.dispatch(
            createPermissions({
              permissions: [this.createPermissionForm.value],
            })
          );
      });
  }
}
