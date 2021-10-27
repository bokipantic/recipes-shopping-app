import { Action, createReducer, on } from "@ngrx/store";

import { User } from "src/app/models/user.model";
import * as fromAuthActions from "./auth.actions";

export interface State {
    user: User,
    authError: string,
    loading: boolean
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false
};

const _authReducer = createReducer(
    initialState,
    on(
        fromAuthActions.loginStart,
        fromAuthActions.signupStart,
        state => ({
            ...state,
            authError: null,
            loading: true
        })
    ),
    on(
        fromAuthActions.authSuccess,
        (state, action) => {
            const user = new User(
                action.email,
                action.userId,
                action.token,
                action.tokenExpirationDate
            );
            return {
                ...state,
                user: user,
                authError: null,
                loading: false
            };
        }
    ),
    on(
        fromAuthActions.logout,
        state => ({
            ...state,
            user: null
        })
    ),
    on(
        fromAuthActions.authFail,
        (state, action) => ({
            ...state,
            user: null,
            authError: action.errorMessage,
            loading: false
        })
    ),
    on(
        fromAuthActions.clearError,
        state => ({
            ...state,
            authError: null
        })
    )
);

export function authReducer(state: State, action: Action) {
    return _authReducer(state, action);
}