import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.authService.auth.id) {
    //   return true;
    // }
    // return false;
    return this.authService.verifyAuthentication().pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['./auth']);
        }
      })
    );

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    // console.log('canLoad',true);
    // console.log(route);
    // console.log(segments);
    // if (this.authService.auth.id) {
    //   return true;
    // }

    // return false;

    return this.authService.verifyAuthentication().pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['./auth']);
        }
      })
    );
  }
}
