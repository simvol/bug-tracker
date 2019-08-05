import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bug, GetBugs } from '../Bug';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BugsService } from '../services/bugs.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.scss']
})
export class BugComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['position', 'name'];
  bugs$: Observable<Bug[]>;

  constructor(private store: Store<any>, private bugsService: BugsService) {}

  ngOnInit() {
    this.bugsService.getBugs();
    this.bugs$ = this.store.select('bugs');
  }

  ngOnDestroy() {}
}
