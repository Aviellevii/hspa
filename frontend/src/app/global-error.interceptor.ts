import { HttpEvent, 
  HttpInterceptor, 
  HttpHandler, 
  HttpRequest, 
  HttpResponse,
  HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from './Services/alertify.service';
@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {
  constructor(private alertify:AlertifyService,private router:Router){}
intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
return next.handle(request)
.pipe(
  catchError( (error: HttpErrorResponse) => { 
     let errMsg = '';
     // Client Side Error
     if (error.error instanceof ErrorEvent) {        
       errMsg = `Error: ${error.error.message}`;
       this.alertify.error(`Error: ${error.error.message}`)
     } 
     else {  // Server Side Error
       errMsg = `Error Code: ${error.status},  Message: ${error.message}`;

       if(error.status == 401){
        this.alertify.error('You not Athorize to make this Action Please login');
        this.router.navigateByUrl('/login');
       }
       else this.alertify.error(`Message: ${error.error}`)

     }
     return throwError(errMsg);
   })
)
}
}  
