import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, of } from 'rxjs';
import { map, switchMap, delay, catchError } from 'rxjs/operators';

// INTERFACE //
export interface IUser {
  uid: string;
  displayName: string;
  loading?: boolean;
  error?: string;
}

// CLASS //
export class User implements IUser {
  constructor(public uid: string, public displayName: string) {}
}

// ACTIONS //
export const GET_USER = '[Auth] Get user';
export const AUTHENTICATED = '[Auth] Authenticated';
export const NOT_AUTHENTICATED = '[Auth] Not Authenticated';

export const GOOGLE_LOGIN = '[Auth] Google login attempt';
export const LOGOUT = '[Auth] Logout';

export const AUTH_ERROR = '[Auth] Error';

// Get User AuthState
export class GetUser implements Action {
  readonly type = GET_USER;
  constructor(public payload?: any) {}
}

export class Authenticated implements Action {
  readonly type = AUTHENTICATED;
  constructor(public payload?: any) {}
}

export class NotAuthenticated implements Action {
  readonly type = NOT_AUTHENTICATED;
  constructor(public payload?: any) {}
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR;
  constructor(public payload?: any) {}
}

// Google Login Actions
export class GoogleLogin implements Action {
  readonly type = GOOGLE_LOGIN;
  constructor(public payload?: any) {}
}

// Logout Actions
export class Logout implements Action {
  readonly type = LOGOUT;
  constructor(public payload?: any) {}
}

export type UserAction =
  | GetUser
  | Authenticated
  | NotAuthenticated
  | GoogleLogin
  | AuthError
  | Logout;

// REDUCER //
const defaultUser = new User(null, 'GUEST');

export function userReducer(state: User = defaultUser, action: UserAction) {
  switch (action.type) {
    case GET_USER:
      return { ...state, loading: true };

    case AUTHENTICATED:
      return { ...state, ...action.payload, loading: false };

    case NOT_AUTHENTICATED:
      return { ...state, ...defaultUser, loading: false };

    case GOOGLE_LOGIN:
      return { ...state, ...action.payload, loading: true };

    case AUTH_ERROR:
      return { ...state, ...action.payload, loading: false };

    case LOGOUT:
      return { ...state, loading: true };
  }
}

// EFFECTS //
@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private afAuth: AngularFireAuth) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GET_USER),
      map((action: GetUser) => action.payload),
      switchMap(payload => this.afAuth.authState),
      map(authData => {
        if (authData) {
          /// User logged in
          const user = new User(authData.uid, authData.displayName);
          return new Authenticated(user);
        } else {
          /// User not logged in
          return new NotAuthenticated();
        }
      }),
      catchError(error => of(new AuthError()))
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GOOGLE_LOGIN),

      map((action: GoogleLogin) => action.payload),
      switchMap(payload => {
        return from(this.googleLogin(payload));
      }),
      map(credential => {
        // successful login
        return new GetUser();
      }),
      catchError(err => {
        return of(new AuthError({ error: err.message }));
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOGOUT),
      map((action: Logout) => action.payload),
      switchMap(payload => {
        return of(this.afAuth.auth.signOut());
      }),
      map(authData => {
        return new NotAuthenticated();
      }),
      catchError(err => of(new AuthError({ error: err.message })))
    )
  );

  private googleLogin({ login, password }): any {
    return this.afAuth.auth.signInWithEmailAndPassword(login, password);
  }
}
