import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { LoadingBtn } from '@app/directives/loading-btn';
import { ToastService } from '@app/services/toast';
import { UserService } from '@app/services/user';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, LoadingBtn],
  templateUrl: './login.html',
  styles: `
  `
})
export class Login {
  private userService = inject(UserService);
  private toastService = inject(ToastService);
  protected loginForm = new FormBuilder().group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })
  protected errorMessage = signal<string | null>(null);
  protected loading = signal<boolean>(false);

  protected login() {
    if (this.loginForm.valid) {
      this.loading.set(true);
      this.userService.loginAsync({
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!
      }).subscribe({
        next: ({ user, access_token }) => {
          this.userService.setAuthState(user);
          this.loading.set(false);
        },
        error: (err) => {
          this.errorMessage.set(err.error.message || 'Login failed');
          this.toastService.showError(err.error.message);
          this.loading.set(false);
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }

}
