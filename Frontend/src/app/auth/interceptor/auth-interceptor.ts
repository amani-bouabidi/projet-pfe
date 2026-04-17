import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../service/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.auth.getToken();
      let authReq = req ;

      if (token) {
        authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      return next.handle(authReq).pipe(

        catchError((error : HttpErrorResponse) => {
          if (error.status === 401){
            return this.auth.refresh().pipe(

              switchMap((res) => {
                localStorage.setItem('token', res.jwt);
                const newReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${res.jwt}`
                  }
                });

                return next.handle(newReq);
              }),
              catchError(err => {
                this.auth.logout();
                return throwError(() => err);
              })
            );
          }
          return throwError(() => error);
        })
      );
  }

}
