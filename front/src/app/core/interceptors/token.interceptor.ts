import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/user/token.service';
import { ApiService } from '../http/api.service';

const CHECK_REQ = new HttpContextToken<boolean>(() => true);

// llamar esta funcion en las peticiones que decida no interceptarlas, o cambiar que por defecto no se intercepten
export function checkTime() {
  return new HttpContext().set(CHECK_REQ, false)
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private apiService: ApiService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(CHECK_REQ)) {
      console.log("agregando token")
      request = this.addToken(request)
      return next.handle(request);

    }
    console.log("sin agregar token")
    return next.handle(request);
  }

  addToken(request: HttpRequest<unknown>) {
    const token = this.tokenService.getToken();
    console.log("obteniendo token:")
    console.log(token)
    if(token) {
      this.apiService.setHeader('Authorization',`Bearer ${token}`)
      console.log("seteo de headers con el token")
      return request;
    }
    return request;
  }
}
