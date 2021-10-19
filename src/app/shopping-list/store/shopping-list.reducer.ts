import * as fromShoppingListActions from "./shopping-list.actions";
import { Ingredient } from "src/app/models/ingredient.model";

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

const initialState: State = {
    ingredients: [],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state: State = initialState, action: fromShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case fromShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case fromShoppingListActions.ADD_EXISTING_INGREDIENT:
            const newAmount = +state.ingredients[action.payload.index].amount + +action.payload.addedIngredient.amount;
            const ingredientAdded = {
                ...state.ingredients[action.payload.index],
                amount: newAmount
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients.splice(action.payload.index, 1, ingredientAdded);
            return {
                ...state,
                ingredients: updatedIngredients
            };
        case fromShoppingListActions.EDIT_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const editedIngredient = {
                ...ingredient,
                ...action.payload
            };
            const editedIngredients = [...state.ingredients];
            editedIngredients[state.editedIngredientIndex] = editedIngredient;
            return {
                ...state,
                ingredients: editedIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        case fromShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => igIndex !== state.editedIngredientIndex),
                editedIngredient: null,
                editedIngredientIndex: -1

                // const reducedIngredients = [...state.ingredients];
                // reducedIngredients.splice(action.payload, 1);
                // return {
                //     ...state,
                //     ingredients: reducedIngredients
                // };
            };
        case fromShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: { ...state.ingredients[action.payload] }
            };
        case fromShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        default:
            return state;
    }
}