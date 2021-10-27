import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Recipe } from 'src/app/models/recipe.model';
import * as fromShoppingListActions from 'src/app/shopping-list/store/shopping-list.actions';
import * as fromAppReducer from 'src/app/store/app.reducer';
import * as fromRecipeActions from '../store/recipe.actions';
import * as fromRecipeReducer from '../store/recipe.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeSelected: Recipe;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAppReducer.AppState>
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: Params): number => +params.id),
        switchMap((id: number): Observable<fromRecipeReducer.State> => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map((recipesState: fromRecipeReducer.State): Recipe => recipesState.recipes[this.id])
      )
      .subscribe((recipe: Recipe) => this.recipeSelected = recipe);
  }

  onAddToShoppingList() {
    this.recipeSelected.ingredients.forEach(ingredient => {
      this.store.dispatch(fromShoppingListActions.addIngredient({ ingredient: ingredient }));
    });
  }

  onDeleteRecipe() {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.store.dispatch(fromRecipeActions.deleteRecipe({ index: this.id }));
      this.store.dispatch(fromRecipeActions.saveRecipes());
      this.router.navigate(['/']);
    }
  }

}
