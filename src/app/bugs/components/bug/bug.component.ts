import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bug, ChangeBugStatus, UpdateFilteredList } from '../../Bug';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { BugsService } from '../../services/bugs.service';
import { FormControl, NgForm } from '@angular/forms';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.scss']
})
export class BugComponent implements OnInit, OnDestroy {
  bugs$: Observable<Bug[]>;
  panelOpenState = false;
  filterValue: string;
  filterFormControl = new FormControl('', []);
  constructor(private store: Store<any>, private bugsService: BugsService) {}

  ngOnInit() {
    this.bugsService.getBugs();
    this.bugs$ = this.store.select('bugs');

    this.filterFormControl.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        switchMap(val => {
          this.store.dispatch(new UpdateFilteredList(val));
          return of(val);
        })
      )
      .subscribe();
  }

  // filterUpdated($event: any) {
  //   if ($event.value) {
  //     this.store.dispatch(new UpdateFilteredList($event.value));
  //     this.bugs$ = this.store.select('filteredBugs');
  //   } else {
  //     this.bugs$ = this.store.select('bugs');
  //   }
  // }

  changedStatus(bug: Bug, $event: any) {
    // TODO Move to the service
    this.store.dispatch(new ChangeBugStatus({ bug, status: $event.value }));
  }

  ngOnDestroy() {}
}
