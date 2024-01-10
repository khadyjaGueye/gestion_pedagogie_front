import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, } from 'rxjs';

@Injectable()
export class AuthentificateInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tocken = localStorage.getItem("token");
    if (tocken) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${tocken}`)
      });
    }
    return next.handle(request)
    // .pipe(
    //   catchError(error => {
    //     if (error.status == 401) {
    //       localStorage.removeItem("token")
    //     }
    //     return throwError(() => new Error("tocken incorrecte"))
    //   })
    // );
  }
}

export const AuthentificateInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthentificateInterceptor,
  multi: true
}
