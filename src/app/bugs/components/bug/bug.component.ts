import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bug, ChangeBugStatus, UpdateFilteredList } from '../../Bug';
import { Store, select } from '@ngrx/store';
import { Observable, of, forkJoin, zip, combineLatest, timer } from 'rxjs';
import { BugsService } from '../../services/bugs.service';
import { FormControl, NgForm } from '@angular/forms';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
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
    const selectTypeValues = this.typeFormControl.valueChanges;
    const searchValues = this.filterFormControl.valueChanges;

    // combineLatest(selectTypeValues, searchValues)
    // .pipe(
    //   debounceTime(250),
    //   distinctUntilChanged(),
    //   switchMap(val => {
    //     console.log(val);
    //     this.store.dispatch(new UpdateFilteredList(val));
    //     return of(val);
    //   })
    // )
    // .subscribe(([val]) => console.log('value', val));

    // const firstTimer = timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
    // const secondTimer = timer(500, 1000); // emit 0, 1, 2... after every second, starting 0,5s from now
    const combinedTimers = combineLatest(selectTypeValues, searchValues);
    combinedTimers.subscribe(value => console.log(value));

    // const searchValues = this.filterFormControl.valueChanges
    //   .pipe(
    //     debounceTime(250),
    //     distinctUntilChanged(),
    //     switchMap(val => {
    //       this.store.dispatch(new UpdateFilteredList(val));
    //       return of(val);
    //     })
    //   )
    //   .subscribe();
  }

  changedStatus(bug: Bug, $event: any) {
    // TODO Move to the service
    this.store.dispatch(new ChangeBugStatus({ bug, status: $event.value }));
  }

  ngOnDestroy() {}
}
