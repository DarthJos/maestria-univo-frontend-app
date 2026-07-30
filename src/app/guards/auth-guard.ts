import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // 1. Verificamos si el token de autenticación está presente en el localStorage
  const token = localStorage.getItem('auth_token');

  if (token) {
    // 2. Si tienen token, la puerta se abre (true)
    return true;
  } else {
    // 3. Si no tienen token, redirigimos al login y la puerta se cierra (false)
    router.navigate(['/login']);
    return false;
  }

}
