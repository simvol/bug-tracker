import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

// INTERFACE //
export interface IErrorType {
  label: string;
  regexp: string;
}
export interface ISettings {
  id: string;
  loading: boolean;
  errorTypes: IErrorType[];
}

// CLASS //
export class Settings implements ISettings {
  constructor(
    public id: string,
    public loading: boolean,
    public errorTypes: IErrorType[]
  ) {}
}

// ACTIONS //
export const GET_SETTINGS = '[Settings] Get settings';
export const GET_SETTINGS_SUCCESS = '[Settings] Get settings success';
export const GET_SETTINGS_FAIL = '[Settings] Get settings fail';

export const CHANGE_SETTINGS = '[Settings] Get settings';
export const CHANGE_SETTINGS_SUCCESS = '[Settings] Get settings success';
export const CHANGE_SETTINGS_FAIL = '[Settings] Get settings fail';

export class GetSettings implements Action {
  readonly type = GET_SETTINGS;
  constructor(public payload?: any) {}
}

export class GetSettingsSuccess implements Action {
  readonly type = GET_SETTINGS_SUCCESS;
  constructor(public payload?: any) {}
}

export class GetSettingsFail implements Action {
  readonly type = GET_SETTINGS_FAIL;
  constructor(public payload?: any) {}
}

export class ChangeSettings implements Action {
  readonly type = CHANGE_SETTINGS;
  constructor(public payload?: any) {}
}

export class ChangeSettingsSuccess implements Action {
  readonly type = CHANGE_SETTINGS_SUCCESS;
  constructor(public payload?: any) {}
}

export class ChangeSettingsFail implements Action {
  readonly type = CHANGE_SETTINGS_FAIL;
  constructor(public payload?: any) {}
}

export type SettingssAction =
  | GetSettings
  | GetSettingsSuccess
  | GetSettingsFail
  | ChangeSettings
  | ChangeSettingsSuccess
  | ChangeSettingsFail;

// REDUCER //
const defaultState = {
  loading: false,
  settings: {}
};

export function settingsReducer(
  state: any = defaultState,
  action: SettingssAction
) {
  switch (action.type) {
    case GET_SETTINGS:
      return { ...state, loading: true };
    case GET_SETTINGS_SUCCESS:
      return {
        ...state,
        settings: action.payload,
        loading: false
      };
    case GET_SETTINGS_FAIL:
      return { ...state, ...action.payload, loading: false };
    case CHANGE_SETTINGS:
      return { ...state, loading: true };
    case CHANGE_SETTINGS_FAIL:
      return { ...state, loading: false };
    case CHANGE_SETTINGS_SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
}

// EFFECTS //
@Injectable()
export class SettingsEffects {
  constructor(private actions$: Actions, private db: AngularFirestore) {}

  getSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GET_SETTINGS),
      map((action: GetSettings) => action.payload),
      switchMap(() => {
        return from(this.getSettings());
      }),
      map(settings => {
        return new GetSettingsSuccess(settings);
      }),
      catchError(error => of(new GetSettingsFail(error)))
    )
  );

  changeSettingsStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CHANGE_SETTINGS),
      map((action: ChangeSettings) => action.payload),
      switchMap(({ settings }) => {
        return from(this.changeSettings(settings));
      }),
      map(settings => {
        return new ChangeSettingsSuccess(settings);
      }),
      catchError(error => of(new ChangeSettingsFail(error)))
    )
  );

  getSettings(): any {
    return this.db
      .collection('settings')
      .doc('default')
      .valueChanges();
  }

  changeSettings(settings: Settings): any {
    const updatedSettings = { ...settings };

    return this.db
      .collection('settings')
      .doc('default')
      .update(updatedSettings);
  }
}
