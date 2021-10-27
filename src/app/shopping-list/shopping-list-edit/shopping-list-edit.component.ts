import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/models/ingredient.model';
import * as fromAppReducer from 'src/app/store/app.reducer';
import * as fromShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  editMode = false;
  private editedIngredient: Ingredient;
  private editSubcription: Subscription;

  constructor(private store: Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
    this.editSubcription = this.store.select('shoppingList')
      .subscribe(stateData => {
        const editIndex = stateData.editedIngredientIndex;
        if (editIndex > -1) {
          this.editMode = true;
          this.editedIngredient = stateData.ingredients[editIndex];
          this.slForm.setValue({
            name: this.editedIngredient.name,
            amount: this.editedIngredient.amount
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onAddOrEditIngredient(form: NgForm) {
    const ingredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.store.dispatch(fromShoppingListActions.editIngredient({ ingredient: ingredient }));
    } else {
      this.store.dispatch(fromShoppingListActions.addIngredient({ ingredient: ingredient }));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(fromShoppingListActions.stopEdit());
  }

  onDelete() {
    this.store.dispatch(fromShoppingListActions.deleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.editSubcription.unsubscribe();
    this.store.dispatch(fromShoppingListActions.stopEdit());
  }
}
