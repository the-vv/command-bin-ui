import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styles: `
    .login-bg::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      opacity: 0.4;
      background-image: url('/login-bg.png');
      background-size: cover;
      background-position: left center;
    }
  `
})
export class Login {
  private userService = inject(UserService);
  protected loginForm = new FormBuilder().group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })
  protected errorMessage = signal<string | null>(null);

  protected login() {
    if (this.loginForm.valid) {
      this.userService.loginAsync({
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!
      }).subscribe({
        next: ({ user, access_token }) => {
          this.userService.setAuthState(user);
          this.userService.token = access_token;
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }

}
