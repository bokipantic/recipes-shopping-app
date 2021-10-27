import { Action, createReducer, on } from "@ngrx/store";

import * as fromShoppingListActions from "./shopping-list.actions";
import { Ingredient } from "src/app/models/ingredient.model";

export interface State {
    ingredients: Ingredient[],
    editedIngredientIndex: number
}

const initialState: State = {
    ingredients: [],
    editedIngredientIndex: -1
};

const _shoppingListReducer = createReducer(
    initialState,
    on(
        fromShoppingListActions.addIngredient,
        (state, action) => {
            let addedIngredients: Ingredient[];
            if (state.ingredients.length && state.ingredients.find(i => i.name === action.ingredient.name)) {
                addedIngredients = state.ingredients.map(i => i.name === action.ingredient.name ?
                    new Ingredient(i.name, +i.amount + +action.ingredient.amount) : i);
            } else {
                addedIngredients = state.ingredients.concat(action.ingredient);
                // addedIngredients = [...state.ingredients, action.ingredient];
            }
            return {
                ...state,
                ingredients: addedIngredients
            };
        }
    ),
    on(
        fromShoppingListActions.editIngredient,
        (state, action) => ({
            ...state,
            ingredients: state.ingredients.map(
                (ingredient, index) => index === state.editedIngredientIndex ? action.ingredient : ingredient
            ),
            editedIngredientIndex: -1
        })
        // (state, action) => {
        //     const ingredient = state.ingredients[state.editedIngredientIndex];
        //     const editedIngredient = {
        //         ...ingredient,
        //         ...action.ingredient
        //     };
        //     const editedIngredients = [...state.ingredients];
        //     editedIngredients[state.editedIngredientIndex] = editedIngredient;
        //     return {
        //         ...state,
        //         ingredients: editedIngredients,
        //         editedIngredientIndex: -1
        //     };
        // }
    ),
    on(
        fromShoppingListActions.deleteIngredient,
        state => ({
            ...state,
            ingredients: state.ingredients.filter((ig, index) => index !== state.editedIngredientIndex),
            editedIngredientIndex: -1

            // const reducedIngredients = [...state.ingredients];
            // reducedIngredients.splice(action.payload, 1);
            // return {
            //     ...state,
            //     ingredients: reducedIngredients
            // };
        })
    ),
    on(
        fromShoppingListActions.startEdit,
        (state, action) => ({
            ...state,
            editedIngredientIndex: action.index
        })
    ),
    on(
        fromShoppingListActions.stopEdit,
        state => ({
            ...state,
            editedIngredientIndex: -1
        })
    )
);

export function shoppingListReducer(state: State, action: Action) {
    return _shoppingListReducer(state, action);
}