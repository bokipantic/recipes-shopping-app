import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import * as fromAuthActions from "./auth.actions";
import { User } from "src/app/models/user.model";
import { AuthService } from "../auth.service";

export interface AuthResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const handleAuth = (email: string, userId: string, token: string, expiresIn: number) => {
    const tokenExpirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, tokenExpirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new fromAuthActions.AuthSuccess({
        email: email,
        userId: userId,
        token: token,
        tokenExpirationDate: tokenExpirationDate,
        redirect: true
    });
};

const handleError = (errorRes: any) => {
    if (!errorRes.error || !errorRes.error.error) {
        return of(new fromAuthActions.AuthFail('An unknown error occured!'));
    }
    return of(new fromAuthActions.AuthFail(errorRes.error.error.message));
};

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService) { }

    authSignup$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromAuthActions.SIGNUP_START),
            switchMap((signupAction: fromAuthActions.SignupStart) => {
                const newUser = {
                    email: signupAction.payload.email,
                    password: signupAction.payload.password,
                    returnSecureToken: true
                };
                return this.http.post<AuthResponse>(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyA9xPQc_sZi__jzARZq7QQwFWClqddBpnc', newUser
                ).pipe(
                    tap(response => this.authService.setLogoutTimer(+response.expiresIn * 1000)),
                    map(response => {
                        return handleAuth(response.email, response.localId, response.idToken, +response.expiresIn);
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes);
                    })
                );
            })
        );
    });

    authLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromAuthActions.LOGIN_START),
            switchMap((loginAction: fromAuthActions.LoginStart) => {
                const user = {
                    email: loginAction.payload.email,
                    password: loginAction.payload.password,
                    returnSecureToken: true
                };
                return this.http.post<AuthResponse>(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyA9xPQc_sZi__jzARZq7QQwFWClqddBpnc ', user
                ).pipe(
                    tap(response => this.authService.setLogoutTimer(+response.expiresIn * 1000)),
                    map(response => {
                        return handleAuth(response.email, response.localId, response.idToken, +response.expiresIn);
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes);
                    })
                );
            })
        );
    });

    authRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromAuthActions.AUTH_SUCCESS),
            tap((authSuccessAction: fromAuthActions.AuthSuccess) => {
                if (authSuccessAction.payload.redirect) {
                    this.router.navigate(['/']);
                }
            })
        );
    }, { dispatch: false });

    authAutoLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromAuthActions.AUTO_LOGIN),
            map(() => {
                const userData: {
                    email: string,
                    userId: string,
                    _token: string,
                    _tokenExpirationDate: string
                } = JSON.parse(localStorage.getItem('userData'));

                if (!userData) {
                    return { type: 'whatever' };
                }
                const loggedInUser = new User(
                    userData.email,
                    userData.userId,
                    userData._token,
                    new Date(userData._tokenExpirationDate)
                );

                if (loggedInUser.token) {
                    const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                    this.authService.setLogoutTimer(expirationDuration);
                    return new fromAuthActions.AuthSuccess({
                        email: loggedInUser.email,
                        userId: loggedInUser.userId,
                        token: loggedInUser.token,
                        tokenExpirationDate: new Date(userData._tokenExpirationDate),
                        redirect: false
                    });
                }
                return { type: 'whatever' };
            })
        );
    });

    authLogout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromAuthActions.LOGOUT),
            tap(() => {
                this.authService.clearLogoutTimer();
                localStorage.removeItem('userData');
                this.router.navigate(['/auth']);
            })
        );
    }, { dispatch: false });

}