import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';

import { User } from '../models/user.model';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null); // emits its current value whenever it is subscribed to
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    const newUser = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyA9xPQc_sZi__jzARZq7QQwFWClqddBpnc', newUser)
      .pipe(
        catchError(this.handleError),
        tap(response => {
          this.handleAuth(response.email, response.localId, response.idToken, +response.expiresIn);
        })
      );
  }

  login(email: string, password: string) {
    const user = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyA9xPQc_sZi__jzARZq7QQwFWClqddBpnc ', user)
      .pipe(
        catchError(this.handleError),
        tap(response => {
          this.handleAuth(response.email, response.localId, response.idToken, +response.expiresIn);
        })
      );
  }

  private handleError(errorRes: HttpErrorResponse) {
    if (!errorRes.error || !errorRes.error.error) {
      return throwError('An unknown error occured!');
    }
    return throwError(errorRes.error.error.message);
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const tokenExpirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, tokenExpirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  // if user reloads page:
  autoLogin() {
    const userData: {
      email: string,
      userId: string,
      _token: string,
      _tokenExpirationDate: string // not type Date
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }
    const loggedInUser = new User(
      userData.email,
      userData.userId,
      userData._token,
      new Date(userData._tokenExpirationDate) // convert string to date
    );
    
    if (loggedInUser.token) {
      this.user.next(loggedInUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    // if user logouts manually
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => this.logout(), expirationDuration);
  }

}
