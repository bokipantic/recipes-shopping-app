import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAppReducer from 'src/app/store/app.reducer';
import * as fromShoppingListReducer from '../store/shopping-list.reducer';
import * as fromShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients$: Observable<fromShoppingListReducer.State>;

  constructor(private store: Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
    this.ingredients$ = this.store.select('shoppingList');
  }

  onEditIngredient(index: number) {
    this.store.dispatch(fromShoppingListActions.startEdit({ index: index }));
  }

}
