import { Component, OnInit } from '@angular/core';
import { Settings, GetSettings } from '../../Settings';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings$: Observable<Settings>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store.dispatch(new GetSettings());
    this.settings$ = this.store.select('settings');
  }
}
