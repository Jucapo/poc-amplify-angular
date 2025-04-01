// role.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard = (expectedRole: 'admin' | 'user'): CanActivateFn => {
  return async () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const role = await authService.getCurrentUserRole();
    return (
      role === expectedRole ||
      router.createUrlTree([role === 'admin' ? '/admin' : '/profile'])
    );
  };
};
