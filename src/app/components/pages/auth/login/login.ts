import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoadingBtn } from '@app/directives/loading-btn';
import { ToastService } from '@app/services/toast-service';
import { UserService } from '@app/services/user';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, LoadingBtn, RouterLink],
  templateUrl: './login.html',
  styles: `
  `
})
export class Login {
  private router = inject(Router);
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
          this.userService.setAuthState(user, access_token);
          this.loading.set(false);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.errorMessage.set(err.error.message || 'Login failed');
          this.toastService.showError(err.error.message);
          this.loading.set(false);
        }
      });
    } else {
      this.errorMessage.set('Please fill in all the fields correctly.');
    }
  }

}
