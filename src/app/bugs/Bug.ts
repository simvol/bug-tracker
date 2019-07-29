import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { map, switchMap, delay, catchError } from 'rxjs/operators';

// INTERFACE //
export interface IBug {
  id?: number;
  userEmail: string;
  message: string;
  date: number;
  isSeen?: boolean;
  isFixed?: boolean;
}

// CLASS //
export class Bug implements IBug {
  constructor(
    public id: number,
    public userEmail: string,
    public message: string,
    public date: number,
    public isSeen: boolean,
    public isFixed: boolean
  ) {}
}

// ACTIONS //
export const GET_BUGS = '[Bug] Get bugs';
export const GET_BUGS_SUCCESS = '[Bug] Get bugs success';
export const GET_BUGS_FAIL = '[Bug] Get bugs fail';

export class GetBugs implements Action {
  readonly type = GET_BUGS;
  constructor(public payload?: any) {}
}

export class GetBugsSuccess implements Action {
  readonly type = GET_BUGS_SUCCESS;
  constructor(public payload?: any) {}
}

export class GetBugsFail implements Action {
  readonly type = GET_BUGS_FAIL;
  constructor(public payload?: any) {}
}

export type BugsAction = GetBugs | GetBugsSuccess | GetBugsFail;

// REDUCER //
const defaultState = [];

export function bugsReducer(state: Bug[] = defaultState, action: BugsAction) {
  switch (action.type) {
    case GET_BUGS:
      return { ...state, loading: true };
    case GET_BUGS_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case GET_BUGS_FAIL:
      return { ...state, ...action.payload, loading: false };
  }
}

// EFFECTS //
@Injectable()
export class BugsEffects {
  constructor(private actions$: Actions) {}

  getBugs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GET_BUGS),
      map((action: GetBugs) => action.payload),
      map(bugs => {
        return new GetBugsSuccess(bugs);
      }),
      catchError(error => of(new GetBugsFail(error.json())))
    )
  );
}
