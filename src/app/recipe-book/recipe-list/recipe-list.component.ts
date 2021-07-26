import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { RecipesService } from 'src/app/share-between/recipes.service';
import { DataStorageService } from 'src/app/share-between/data-storage.service';
import { Recipe } from '../../models/recipe-model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesSubscription: Subscription;

  constructor(private recipeService: RecipesService, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.dataStorageService.fetchRecipes().subscribe();
    this.recipesSubscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => this.recipes = recipes
    );
  }

  ngOnDestroy() {
    this.recipesSubscription.unsubscribe();
  }

}
