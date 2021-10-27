import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, withLatestFrom } from "rxjs/operators";

import * as fromRecipeActions from "./recipe.actions";
import { Recipe } from "src/app/models/recipe.model";
import * as fromAppReducer from "src/app/store/app.reducer";

@Injectable()
export class RecipeEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromAppReducer.AppState>) { }

  fetchRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromRecipeActions.fetchRecipes),
      switchMap(() => {
        return this.http.get<Recipe[]>('https://recipe-book-c2e98-default-rtdb.firebaseio.com/recipes.json')
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      map(recipes => fromRecipeActions.setRecipes({ recipes: recipes }))
    );
  });

  saveRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromRecipeActions.saveRecipes),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([actionData, recipesState]) => {
        return this.http.put<Recipe[]>
          ('https://recipe-book-c2e98-default-rtdb.firebaseio.com/recipes.json', recipesState.recipes)
      })
    );
  }, { dispatch: false });
}