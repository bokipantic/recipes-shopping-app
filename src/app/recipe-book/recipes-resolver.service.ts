import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Recipe } from '../models/recipe.model';
import { DataStorageService } from '../share-between/data-storage.service';
import { RecipesService } from './recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private recipeService: RecipesService, private dataStorageService: DataStorageService) { }
  // if user reloads page /recipes/id
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes(); // resolve method subscribe automatically
    } else {
      return recipes;
    }
  }
}
