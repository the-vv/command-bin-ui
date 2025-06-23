import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  return userService.isAuthenticated() || inject(Router).parseUrl('/login');
};
