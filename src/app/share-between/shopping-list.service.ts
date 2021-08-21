import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [];
  ingredientsChanged = new Subject<Ingredient[]>();
  startEditing = new Subject<number>();

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    if (!this.ingredients.length || (this.ingredients.length && !this.ingredients.find(i => i.name === ingredient.name))) {
      this.ingredients.push(ingredient);
    } else {
      const existedIngr = this.ingredients.find(i => i.name === ingredient.name);
      existedIngr.amount = +existedIngr.amount + +ingredient.amount;
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  editIngredient(index: number, editedIngr: Ingredient) {
    this.ingredients[index] = editedIngr;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addToShoppingList(ingredients: Ingredient[]) {
    for (const ingredient of ingredients) {
      if (this.ingredients.length && this.ingredients.find(value => value.name === ingredient.name)) {
        const existedIngr = this.ingredients.find(i => i.name === ingredient.name);
        existedIngr.amount = +existedIngr.amount + +ingredient.amount;
      } else {
        this.ingredients.push(ingredient);
      }
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
