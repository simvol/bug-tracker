import { Component, OnInit } from '@angular/core';
import { Bug, GetBugs } from '../Bug';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BugsService } from '../services/bugs.service';

@Component({
  selector: 'app-bug',
  template: `
    tetete
  `,
  styleUrls: ['./bug.component.scss']
})
export class BugComponent implements OnInit {
  // bugs$: Observable<Bug[]>;
  constructor(private store: Store<any>, private bugsService: BugsService) {}

  ngOnInit() {
    // this.bugs$ = this.store.select('bugs');
    // this.store.dispatch(new GetBugs());
  }
}
