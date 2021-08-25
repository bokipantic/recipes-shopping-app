import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/recipe-book/recipes.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { DataStorageService } from 'src/app/share-between/data-storage.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
 recipeClicked: Recipe;
 id: number;

  constructor(private slService: ShoppingListService,
              private route: ActivatedRoute,
              private recService: RecipesService,
              private router: Router,
              private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeClicked = this.recService.getRecipe(this.id);
      }
    );
  }

  onAddToShoppingList() {
    this.slService.addToShoppingList(this.recipeClicked.ingredients);
    this.dataStorageService.fetchRecipes().subscribe();
    this.recipeClicked = this.recService.getRecipe(this.id);
  }

  onDeleteRecipe() {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recService.deleteRecipe(this.id);
      this.dataStorageService.saveRecipes();
      this.router.navigate(['/']);     
    }
  }

}
