// src/app/infrastructure/interceptors/minimal-mock-interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class MockInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method === 'GET' && req.url.endsWith('/api/users')) {
          const newReq = req.clone({ url: 'assets/mocks/users.json' });
          return next.handle(newReq);
        }
        return next.handle(req);
      }
}
