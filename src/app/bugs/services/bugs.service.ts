import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFireDatabase } from '@angular/fire/database';

import { Bug, GetBugsSuccess } from '../Bug';
import { GetBugs } from '../Bug';
import { Observable, of } from 'rxjs';

import { tap } from 'rxjs/operators';

interface BugsState {
  bugs: Bug[];
}

@Injectable({
  providedIn: 'root'
})
export class BugsService {
  bugs$: Observable<Bug[]> = this.db
    .list<Bug>('bugs')
    .valueChanges()
    .pipe(tap(next => new GetBugsSuccess(next)));

  constructor(
    private store: Store<BugsState>,
    private db: AngularFireDatabase
  ) {}

  getBugs() {
    this.store.dispatch(new GetBugs());
  }
}
