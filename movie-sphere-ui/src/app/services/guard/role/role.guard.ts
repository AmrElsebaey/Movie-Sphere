import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../token/token.service';

export const roleGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (!tokenService.isAdmin()) {
    router.navigate(['movies']);
    return false;
  }
  return true;
};
