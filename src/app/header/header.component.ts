import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import * as fromAppReducer from '../store/app.reducer';
import * as fromAuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed: boolean;
  isAuthenticated: boolean = false;
  private userSubscription: Subscription;

  constructor(private authService: AuthService, private store: Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth').pipe(
      map(authState => authState.user)
    )
    .subscribe(user => {
      this.isAuthenticated = user ? true : false;
    });
  }

  onLogout() {
    this.store.dispatch(new fromAuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
