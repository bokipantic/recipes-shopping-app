import { createAction, props } from "@ngrx/store";

import { Recipe } from "src/app/models/recipe.model";

export const setRecipes = createAction(
    '[Recipes] Set Recipes',
    props<{ recipes: Recipe[] }>()
);

export const fetchRecipes = createAction(
    '[Recipes] Fetch Recipes'
);

export const addRecipe = createAction(
    '[Recipes] Add Recipe',
    props<{ recipe: Recipe }>()
);

export const editRecipe = createAction(
    '[Recipes] Edit Recipe',
    props<{ index: number, editedRecipe: Recipe }>()
);

export const deleteRecipe = createAction(
    '[Recipes] Delete Recipe',
    props<{ index: number }>()
);

export const saveRecipes = createAction(
    '[Recipes] Save Recipes'
);