import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['auth/login'],{queryParams:{'redirectURL':state.url}});

    }
    return this.authService.keepLogin().pipe(
      tap( valid => {
         if ( !valid ) {

          this.router.navigate(['/auth/login'],{queryParams:{'redirectURL':state.url}});
            
        }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean {
    this.authService.keepLogin();
    if (!this.authService.isLoggedIn()) {

      this.router.navigate(['/auth/login']);
      
      
     
    }
    return this.authService.keepLogin().pipe(
      tap( valid => {
         if ( !valid ) {
            this.router.navigate(['/auth/login']);
        }
      })
    );
  }
}
