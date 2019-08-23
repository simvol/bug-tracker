import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Bug } from '../Bug';
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
}
