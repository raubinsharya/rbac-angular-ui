import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export default function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const token = localStorage.getItem('token');
  const newReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
  return next(newReq);
}
