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
  editedIngredient: Ingredient;
  private ingredients: Ingredient[];
  private editSubcription: Subscription;

  constructor(private store: Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
    this.editSubcription = this.store.select('shoppingList')
      .subscribe(stateData => {
        this.ingredients = stateData.ingredients;
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedIngredient = stateData.editedIngredient;
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
      this.store.dispatch(new fromShoppingListActions.EditIngredient(ingredient));
    } else {
      if (!this.ingredients.length || !this.ingredients.find(i => i.name === ingredient.name)) {
        this.store.dispatch(new fromShoppingListActions.AddIngredient(ingredient));
      } else {
        const index = this.ingredients.findIndex(i => i.name === ingredient.name);
        this.store.dispatch(new fromShoppingListActions.AddExistingIngredient({ index: index, addedIngredient: ingredient }));
      }
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new fromShoppingListActions.StopEdit());
  }

  onDelete() {
    this.store.dispatch(new fromShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.editSubcription.unsubscribe();
    this.store.dispatch(new fromShoppingListActions.StopEdit());
  }
}
