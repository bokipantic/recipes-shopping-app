import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromAppReducer from './store/app.reducer';
import * as fromAuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private store: Store<fromAppReducer.AppState>) { }

  ngOnInit() {
    this.store.dispatch(fromAuthActions.autoLogin());
  }

}
