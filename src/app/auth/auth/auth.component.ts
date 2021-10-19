import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromAppReducer from 'src/app/store/app.reducer';
import * as fromAuthActions from '../store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  private storeSub: Subscription;

  constructor(private store: Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.store.dispatch(new fromAuthActions.LoginStart({
        email: email,
        password: password
      }));
    } else {
      this.store.dispatch(new fromAuthActions.SignupStart({
        email: email,
        password: password
      }));
    }
    form.reset();
  }

  onClearError() {
    this.store.dispatch(new fromAuthActions.ClearError());
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

}
