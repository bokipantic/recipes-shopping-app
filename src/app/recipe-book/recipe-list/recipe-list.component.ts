import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromAppReducer from 'src/app/store/app.reducer';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  private recipesSubscription: Subscription;

  constructor(private store: Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
    this.recipesSubscription = this.store.select('recipes')
      .pipe(map(recipesState => recipesState.recipes))
      .subscribe((recipes: Recipe[]) => this.recipes = recipes);
  }

  ngOnDestroy() {
    this.recipesSubscription.unsubscribe();
  }

}
