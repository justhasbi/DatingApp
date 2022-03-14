import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      // rxjs function to catch error
      catchError(error => {
        if(error){
          switch (error.status) {
            // validation error handling
            case 400:
              if(error.error.errors) {
                const modalStateErrors = [];
                // coallesce
                for (const key in error.error.errors) {
                  if(error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key])
                  }
                }
                throw modalStateErrors.flat();
              } else {
              this.toastr.error(error.statusText === "OK" ? "Bad Request" : error.statusText, error.status)
              }
              break;
            case 401:
              this.toastr.error(error.statusText === "OK" ? "Unauthorised" : error.statusText, error.status)
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              // redirect to url with error message
              // state
              const navigationExtras: NavigationExtras = {state: {error: error.error}};
              // send state to next url page
              this.router.navigateByUrl('server-error', navigationExtras);
              break;
            default:
              this.toastr.error('Something unexpected went wrong');
              console.log(error);
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
