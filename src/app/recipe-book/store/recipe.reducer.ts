import { Action, createReducer, on } from "@ngrx/store";

import { Recipe } from "src/app/models/recipe.model";
import * as fromRecipeActions from "./recipe.actions";

export interface State {
    recipes: Recipe[]
}

const initialState: State = {
    recipes: []
};

const _recipeReducer = createReducer(
    initialState,
    on(
        fromRecipeActions.setRecipes,
        (state, action) => ({
            ...state,
            recipes: action.recipes
        })
    ),
    on(
        fromRecipeActions.addRecipe,
        (state, action) => ({
            ...state,
            recipes: state.recipes.concat(action.recipe)
            // recipes: [...state.recipes, action.recipe]
        })
    ),
    on(
        fromRecipeActions.editRecipe,
        (state, action) => ({
            ...state,
            recipes: state.recipes.map(
                (recipe, index) => index === action.index ? action.editedRecipe : recipe
            )
        })
        // (state, action) => {
        //     const editedRecipes = [...state.recipes];
        //     editedRecipes[action.index] = action.editedRecipe;
        //     return {
        //         ...state,
        //         recipes: editedRecipes
        //     };
        // }
    ),
    on(
        fromRecipeActions.deleteRecipe,
        (state, action) => ({
            ...state,
            recipes: state.recipes.filter((recipe, index) => index !== action.index)
        })
    )
);

export function recipeReducer(state: State, action: Action) {
    return _recipeReducer(state, action);
}