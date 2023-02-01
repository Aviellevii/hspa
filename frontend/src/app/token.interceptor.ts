import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from './Services/account.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private accountService:AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.accountService.curnnetUser;

    if(user.token){
      request = request.clone({
        setHeaders:{
          Authorization:user.token
        }
      })
    }
    return next.handle(request);
  }
}
