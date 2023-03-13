import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from './Services/loading.service';
var paddingrequest = 0;
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loading:LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loading.showLoading();
    paddingrequest = paddingrequest + 1;

    return next.handle(request).pipe(
      tap({
        next:(event)=>{
          if(event.type === HttpEventType.Response)
          {
            this.handleHideLoading();
          }
        },
        error:(_) => {
          this.handleHideLoading();
        }
      })
    )
  }
  handleHideLoading() {
    paddingrequest = paddingrequest -1;
    if(paddingrequest === 0)
    this.loading.hideLoading();
  }
}
