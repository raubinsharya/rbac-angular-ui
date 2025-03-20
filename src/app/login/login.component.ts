import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { userLogin } from '../store/actions/user.action';
import { selectLoginLoading } from '../store/selectos/user.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm: FormGroup;
  public loginLoading!: boolean;

  constructor(private fb: FormBuilder, private readonly store: Store) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.store
      .select(selectLoginLoading)
      .subscribe((loading) => (this.loginLoading = loading));
  }

  login() {
    if (this.loginForm.valid) {
      this.store.dispatch(userLogin(this.loginForm.value));
    }
  }
}
