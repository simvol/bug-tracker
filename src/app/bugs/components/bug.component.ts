import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bug, GetBugs } from '../Bug';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BugsService } from '../services/bugs.service';

@Component({
  selector: 'app-bug',
  template: `
    <ul>
      <li *ngFor="let bug of (bugs$ | async).list">
        {{ bug.message | slice: 0:100 }}
      </li>
    </ul>
  `,
  styleUrls: ['./bug.component.scss']
})
export class BugComponent implements OnInit, OnDestroy {
  bugs$: Observable<Bug[]>;
  // subscription: Subscription;

  constructor(private store: Store<any>, private bugsService: BugsService) {}

  ngOnInit() {
    this.bugsService.getBugs();
    // this.subscription = this.bugsService.bugs$.subscribe();
    this.bugs$ = this.store.select('bugs');
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
