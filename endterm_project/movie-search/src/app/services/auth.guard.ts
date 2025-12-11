import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { firstValueFrom, map } from 'rxjs';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const user = await firstValueFrom(auth.currentUser$.pipe(map(u => u)));//1
  
  if (user) {
    return true;
  } else {
    router.navigate(['/login']); 
    return false;
  }
};
