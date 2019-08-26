import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bug, ChangeBugStatus, UpdateFilteredList } from '../../Bug';
import { Store, select } from '@ngrx/store';
import {
  Observable,
  of,
  forkJoin,
  zip,
  combineLatest,
  timer,
  concat,
  merge,
  BehaviorSubject
} from 'rxjs';
import { BugsService } from '../../services/bugs.service';
import { FormControl, NgForm } from '@angular/forms';
import {
  switchMap,
  debounceTime,
  distinctUntilChanged,
  defaultIfEmpty
} from 'rxjs/operators';
import { Settings } from 'src/app/settings/Settings';
import { SettingsService } from 'src/app/settings/services/settings.service';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.scss']
})
export class BugComponent implements OnInit, OnDestroy {
  bugs$: Observable<Bug[]>;
  settings$: Observable<Settings>;

  panelOpenState = false;
  filterValue: string;
  filterFormControl = new FormControl('', []);
  typeFormControl = new FormControl('', []);

  constructor(
    private store: Store<any>,
    private bugsService: BugsService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.bugsService.getBugs();
    this.settingsService.getSettings();

    this.bugs$ = this.store.select('bugs');
    this.settings$ = this.store.select('settings');

    this.addFiltersListeners();
  }

  addFiltersListeners() {
    const initialTypeValue = new BehaviorSubject(null);
    const initialSearchValue = new BehaviorSubject(null);

    this.typeFormControl.valueChanges.subscribe(initialTypeValue);
    this.filterFormControl.valueChanges.subscribe(initialSearchValue);

    combineLatest(initialTypeValue, initialSearchValue).subscribe(res => {
      this.bugsService.updateFilteredList(res);
    });
  }

  changedStatus(bug: Bug, $event: any) {
    // TODO Move to the service
    this.store.dispatch(new ChangeBugStatus({ bug, status: $event.value }));
  }

  ngOnDestroy() {}
}
