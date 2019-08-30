import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { map, switchMap, delay, catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

// INTERFACE //
export interface IBug {
  id?: string;
  userEmail: string;
  message: string;
  date: number;
  isSeen?: boolean;
  isFixed?: boolean;
  allText?: string;
}

// CLASS //
export class Bug implements IBug {
  constructor(
    public userEmail: string,
    public message: string,
    public date: number,
    public isSeen: boolean,
    public isFixed: boolean,
    public status: string,
    public id?: string,
    public allText?: string
  ) {}
}

// ACTIONS //
export const GET_BUGS = '[Bug] Get bugs';
export const GET_BUGS_SUCCESS = '[Bug] Get bugs success';
export const GET_BUGS_FAIL = '[Bug] Get bugs fail';
export const CHANGE_BUG_STATUS = '[Bug] Change bug status';
export const CHANGE_BUG_STATUS_SUCCESS = '[Bug] Change bug status success';
export const CHANGE_BUG_STATUS_FAIL = '[Bug] Change bug status fail';
export const UPDATE_FILTERED_LIST = '[Bug] Update filtered list';

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

export class ChangeBugStatus implements Action {
  readonly type = CHANGE_BUG_STATUS;
  constructor(public payload?: any) {}
}

export class ChangeBugStatusSuccess implements Action {
  readonly type = CHANGE_BUG_STATUS_SUCCESS;
  constructor(public payload?: any) {}
}

export class ChangeBugStatusFail implements Action {
  readonly type = CHANGE_BUG_STATUS_FAIL;
  constructor(public payload?: any) {}
}

export class UpdateFilteredList implements Action {
  readonly type = UPDATE_FILTERED_LIST;
  constructor(public payload?: any) {}
}

export type BugsAction =
  | GetBugs
  | GetBugsSuccess
  | GetBugsFail
  | ChangeBugStatus
  | ChangeBugStatusSuccess
  | ChangeBugStatusFail
  | UpdateFilteredList;

// REDUCER //
export interface IDefaultState {
  loading: boolean;
  list: Bug[];
  filteredList: Bug[];
  filters: string[];
}
const defaultState = {
  loading: false,
  list: [],
  filteredList: [],
  filters: []
};

export function bugsReducer(state: any = defaultState, action: BugsAction) {
  switch (action.type) {
    case GET_BUGS:
      return { ...state, loading: true };
    case GET_BUGS_SUCCESS:
      const bugsList = action.payload.map((bug: Bug) => {
        bug.status = bug.status || 'unresolved';
        return bug;
      });

      return {
        ...state,
        list: bugsList,
        filteredList: getFilteredBugs(bugsList, state.filters),
        loading: false
      };
    case GET_BUGS_FAIL:
      return { ...state, ...action.payload, loading: false };
    case CHANGE_BUG_STATUS:
      return { ...state, loading: true };
    case CHANGE_BUG_STATUS_FAIL:
      return { ...state, loading: false };
    case CHANGE_BUG_STATUS_SUCCESS:
      return { ...state, loading: false };
    case UPDATE_FILTERED_LIST:
      return {
        ...state,
        filters: action.payload,
        filteredList: getFilteredBugs(state.list, action.payload)
      };
    default:
      return state;
  }
  // TODO why this action is fired bunch of times??
  // Is this a right way to do it? Should I use an @effect instead?
  function getFilteredBugs(bugs: Bug[], filters: string[]) {
    const [type, search] = filters;

    if (!type && !search) {
      return bugs;
    }

    return bugs
      .map((bug: Bug) => {
        const concatinatedBug =
          bug.message + '&' + bug.status + '&' + bug.userEmail;
        return { ...bug, allText: concatinatedBug };
      })
      .filter((bug: Bug) => {
        const regexp = new RegExp(type);

        return !type || regexp.test(bug.allText);
      })
      .filter((bug: Bug) => {
        return !search || bug.allText.indexOf(search) !== -1;
      });
  }
}

// EFFECTS //
@Injectable()
export class BugsEffects {
  constructor(private actions$: Actions, private db: AngularFirestore) {}

  getBugs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GET_BUGS),
      map((action: GetBugs) => action.payload),
      switchMap(() => {
        return from(this.getBugs());
      }),
      map(bugs => {
        // I have no idea why this is re-firing each time data changes
        // Observables magic? switchMap magic?
        return new GetBugsSuccess(bugs);
      }),
      catchError(error => of(new GetBugsFail(error)))
    )
  );

  changeBugStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CHANGE_BUG_STATUS),
      map((action: ChangeBugStatus) => action.payload),
      switchMap(({ bug, status }) => {
        return from(this.changeBugStatus(bug, status));
      }),
      map(bugs => {
        return new ChangeBugStatusSuccess(bugs);
      }),
      catchError(error => of(new ChangeBugStatusFail(error)))
    )
  );

  getBugs(): any {
    return this.db.collection('bugs').valueChanges({ idField: 'id' });
  }

  changeBugStatus(bug: Bug, status: string): any {
    const updatedBug = { ...bug, status };

    return this.db
      .collection('bugs')
      .doc(updatedBug.id)
      .update(updatedBug);
  }
}
