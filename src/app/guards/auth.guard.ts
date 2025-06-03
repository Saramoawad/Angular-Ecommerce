import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';




export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('userToken'); 

    console.log('AuthGuard token check:', token);

    if (token) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }

  return false;
};
