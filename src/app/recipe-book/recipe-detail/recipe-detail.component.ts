import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from 'src/app/models/recipe-model';
import { RecipesService } from 'src/app/share-between/recipes.service';
import { ShoppingListService } from 'src/app/share-between/shopping-list.service';

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
              private router: Router) { }

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
  }

  onDeleteRecipe() {
    this.recService.deleteRecipe(this.id);
    this.router.navigate(['/']);
  }

}
