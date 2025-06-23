import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoadingBtn } from '@app/directives/loading-btn';
import { ToastService } from '@app/services/toast';
import { UserService } from '@app/services/user';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, LoadingBtn, RouterLink],
  templateUrl: './register.html',
  styles: ``
})
export class Register {

  private userService = inject(UserService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  protected loginForm = new FormBuilder().group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })
  protected errorMessage = signal<string | null>(null);
  protected loading = signal<boolean>(false);

  protected register() {
    if (this.loginForm.valid) {
      this.loading.set(true);
      this.userService.registerAsync({
        name: this.loginForm.value.name!,
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!
      }).subscribe({
        next: () => {
          this.toastService.showSuccess('Registration successful');
          this.router.navigate(['/login']);
          this.loading.set(false);
        },
        error: (err) => {
          this.errorMessage.set(err.error.message || 'Registration failed');
          this.toastService.showError(err.error.message);
          this.loading.set(false);
        }
      });
    } else {
      this.errorMessage.set('Please fill in all the fields correctly.');
    }
  }

}
