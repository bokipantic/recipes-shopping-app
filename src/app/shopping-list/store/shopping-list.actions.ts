import { Action } from "@ngrx/store";

import { Ingredient } from "src/app/models/ingredient.model";

export const ADD_INGREDIENT = '[Shopping list] Add Ingredient';
export const ADD_EXISTING_INGREDIENT = '[Shopping list] Add Existing Ingredient';
export const EDIT_INGREDIENT = '[Shopping list] Edit Ingredient';
export const DELETE_INGREDIENT = '[Shopping list] Delete Ingredient';
export const START_EDIT = '[Shopping list] Start Edit';
export const STOP_EDIT = '[Shopping list] Stop Edit';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;

    constructor(public payload: Ingredient) { }
}

export class AddExistingIngredient implements Action {
    readonly type = ADD_EXISTING_INGREDIENT;

    constructor(public payload: { index: number, addedIngredient: Ingredient }) { }
}

export class EditIngredient implements Action {
    readonly type = EDIT_INGREDIENT;

    constructor(public payload: Ingredient) { }
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
}

export class StartEdit implements Action {
    readonly type = START_EDIT;

    constructor(public payload: number) { }
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

export type ShoppingListActions = AddIngredient | AddExistingIngredient | EditIngredient | DeleteIngredient | StartEdit | StopEdit;