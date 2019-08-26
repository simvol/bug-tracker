import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Bug, UpdateFilteredList } from '../Bug';
import { GetBugs } from '../Bug';

interface BugsState {
  bugs: Bug[];
}

@Injectable({
  providedIn: 'root'
})
export class BugsService {
  constructor(private store: Store<BugsState>) {}

  getBugs() {
    this.store.dispatch(new GetBugs());
  }

  updateFilteredList(filters: string[]) {
    this.store.dispatch(new UpdateFilteredList(filters));
  }
}
