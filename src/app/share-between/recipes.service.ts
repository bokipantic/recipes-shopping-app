import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../models/ingredient-model';
import { Recipe } from '../models/recipe-model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipesChanged = new Subject<Recipe[]>();
  
  private recipes: Recipe[] = [
    new Recipe(
      'Grilled burger',
      'Spicy',
      'https://www.thespruceeats.com/thmb/5Qgdc0_UsoDNWSa3LlnYemm4AYI=/4494x2528/smart/filters:no_upscale()/juicy-grilled-burgers-3052125-hero-01-c3eb26de65cc49f7a071668f93560f65.jpg',
      [
        new Ingredient('Minced meat', 1),
        new Ingredient('Lettuce', 3),
        new Ingredient('Onion', 2)
      ]
    ),
    new Recipe(
      'Beef with potatoes',
      'Extra tasty',
      'https://img.taste.com.au/pAqIqoAC/taste/2017/11/mustard-black-pepper-beef-with-roast-potatoes-taste_1980x1320-132906-1.jpg',
      [
        new Ingredient('Beef steak', 2),
        new Ingredient('Potatoes', 7),
        new Ingredient('Tomatoes', 5)
      ]
    )
  ];

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  editRecipe(index: number, editedRecipe: Recipe) {
    this.recipes[index] = editedRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
