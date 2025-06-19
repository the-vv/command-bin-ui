import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from './user';
import { catchError, EMPTY } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
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
      }
      return EMPTY;
    })
  );
};
