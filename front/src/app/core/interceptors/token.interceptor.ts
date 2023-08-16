import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/user/token.service';
import { ApiService } from '../http/api.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private apiService: ApiService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addToken(request)
    return next.handle(request);
  }

  addToken(request: HttpRequest<unknown>) {
    const token = this.tokenService.getToken();
    if(token) {
      this.apiService.setHeader('Authorization',`Bearer ${token}`)
      return request;

      // const authReq = request.clone({
      //   headers: request.headers.set('Authorization',`Bearer ${token}`);
      // })
      // return authReq;
    }
    return request;
  }
}
