import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { msalInstance } from '../config/auth.config';

export default function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401)
        return from(
          msalInstance.acquireTokenSilent({
            scopes: [environment.APP_SCOPE],
          })
        ).pipe(
          switchMap(({ accessToken }) => {
            localStorage.setItem('token', accessToken);
            const clonedRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            return next(clonedRequest);
          }),
          catchError((retryError) => {
            return throwError(() => retryError);
          })
        );
      return throwError(() => error);
    })
  );
}
