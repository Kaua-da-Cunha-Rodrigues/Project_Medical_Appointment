import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  
  return inject(AuthService)
    .checkLogin()
    .pipe(
      map((isLoggedIn) =>{
        return isLoggedIn 
          ? true 
          : createUrlTreeFromSnapshot(route, ['/', 'auth', 'login'])
    }))
};
