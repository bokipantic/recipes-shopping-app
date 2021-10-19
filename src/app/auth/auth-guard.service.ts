import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromAppReducer from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private store: Store<fromAppReducer.AppState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => authState.user),
      map(user => {
        const isAuth = !!user; // or = user ? true : false
        if (isAuth) { // if true
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })

      // // Another solution:

      // take(1),
      // map(authState => authState.user),
      // map(user => !!user),
      // tap(isAuth => {
      //   if (!isAuth) { // if false
      //     this.router.navigate(['/auth']);
      //   }
      // })
    );
  }
}