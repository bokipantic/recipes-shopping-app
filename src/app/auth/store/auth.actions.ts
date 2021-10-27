import { createAction, props } from "@ngrx/store";

export const authSuccess = createAction(
    '[Auth] Auth Success',
    props<{
        email: string,
        userId: string,
        token: string,
        tokenExpirationDate: Date,
        redirect: boolean
    }>()
);

export const logout = createAction(
    '[Auth] Logout'
);

export const loginStart = createAction(
    '[Auth] Login Start',
    props<{
        email: string, 
        password: string
    }>()
);

export const signupStart = createAction(
    '[Auth] Signup Start',
    props<{
        email: string, 
        password: string
    }>()
);

export const authFail = createAction(
    '[Auth] Auth Fail',
    props<{
        errorMessage: string
    }>()
);

export const clearError = createAction(
    '[Auth] Clear Error'
);

export const autoLogin = createAction(
    '[Auth] Auto Login'
);
