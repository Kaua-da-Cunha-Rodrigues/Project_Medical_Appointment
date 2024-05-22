import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)

  if(req.url.includes('/auth')){
    return next(req);
  }

  const token = localStorage.getItem(environment.TOKEN_KEY) || ''

  const newReq = req.clone({
    setHeaders: {
      Authorization: token
    }
  })

  return next(newReq).pipe(
    catchError((err: HttpErrorResponse) =>{
      if(err.status === 401 || err.status === 403){
        console.error(err.error.message);
        router.navigate(['auth', 'login'])       
      }
      return  throwError(() => err)
        
    })
  );
};
