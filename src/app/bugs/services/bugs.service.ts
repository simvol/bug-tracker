import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFireDatabase } from '@angular/fire/database';

import { Bug, GetBugsSuccess } from '../Bug';
import { GetBugs } from '../Bug';
import { Observable, of, throwError } from 'rxjs';

import { tap, catchError } from 'rxjs/operators';

interface BugsState {
  bugs: Bug[];
}

@Injectable({
  providedIn: 'root'
})
export class BugsService {
  // bugs$: Observable<Bug[]> = this.db
  //   .list<Bug>('bugs')
  //   .valueChanges()
  //   .pipe(
  //     tap(next => new GetBugsSuccess(next)),
  //     catchError(error => throwError(error))
  //   );

  constructor(
    private store: Store<BugsState>,
    private db: AngularFireDatabase
  ) {}

  getBugs() {
    this.store.dispatch(new GetBugs());
  }
}
