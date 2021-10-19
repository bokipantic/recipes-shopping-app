import { Action } from "@ngrx/store";

import { Recipe } from "src/app/models/recipe.model";

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const ADD_RECIPE = '[Recipes] Add Recipe';
export const EDIT_RECIPE = '[Recipes] Edit Recipe';
export const DELETE_RECIPE = '[Recipes] Delete Recipe';
export const SAVE_RECIPES = '[Recipes] Save Recipes';

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;

    constructor(public payload: Recipe[]) { }
}

export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPES;
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;

    constructor(public payload: Recipe) { }
}

export class EditRecipe implements Action {
    readonly type = EDIT_RECIPE;

    constructor(public payload: { index: number, editedRecipe: Recipe }) { }
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;

    constructor(public payload: number) { }
}

export class SaveRecipes implements Action {
    readonly type = SAVE_RECIPES;
}

export type RecipesActions = SetRecipes | FetchRecipes | AddRecipe | EditRecipe | DeleteRecipe | SaveRecipes;