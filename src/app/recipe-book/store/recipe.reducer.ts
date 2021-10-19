import { Recipe } from "src/app/models/recipe.model";
import * as fromRecipeActions from "./recipe.actions";

export interface State {
    recipes: Recipe[]
}

const initialState: State = {
    recipes: []
};

export function recipeReducer(state = initialState, action: fromRecipeActions.RecipesActions) {
    switch (action.type) {
        case fromRecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: action.payload
            };
        case fromRecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case fromRecipeActions.EDIT_RECIPE:
            const updatedRecipe = {
                ...state.recipes[action.payload.index],
                ...action.payload.editedRecipe
            };
            const editedRecipes = [...state.recipes];
            editedRecipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: editedRecipes
            };
        case fromRecipeActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe, index) => index !== action.payload)
            } 
        default:
            return state;
    }
}