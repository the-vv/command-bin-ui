import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from './user';
import { catchError, EMPTY, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from './toast-service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const toastService = inject(ToastService);
  const token = userService.token;
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        userService.logout();
        router.navigate(['/login']);
        toastService.showError('Session expired. Please log in again.', 5000);
        return EMPTY;
      }
      return throwError(() => error);
    })
  );
};
