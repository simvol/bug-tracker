import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  IDefaultSettingsState,
  GetSettings,
  ChangeSettings,
  Settings,
  IErrorType
} from '../Settings';
import { tap } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Settings;
  constructor(
    private store: Store<IDefaultSettingsState>,
    private utilsService: UtilsService
  ) {}

  getSettings() {
    this.store.dispatch(new GetSettings());
    return this.store
      .select('settings')
      .pipe(tap(value => (this.settings = value)));
  }

  addErrorType() {
    const newSettings = {
      ...this.settings,
      errorTypes: [
        ...this.settings.errorTypes,
        { label: '', regexp: '', id: this.utilsService.getRandomId() }
      ]
    };
    this.store.dispatch(new ChangeSettings(newSettings));
  }

  removeErrorType(id: string) {
    const newSettings = {
      ...this.settings,
      errorTypes: this.settings.errorTypes.filter(item => item.id !== id)
    };
    this.store.dispatch(new ChangeSettings(newSettings));
  }

  saveSettings(changedErrorTypes: IErrorType[]) {
    const somethingHasChanged =
      JSON.stringify(changedErrorTypes) !==
      JSON.stringify(this.settings.errorTypes);

    if (somethingHasChanged) {
      const newSettings = {
        ...this.settings,
        errorTypes: changedErrorTypes
      };
      this.store.dispatch(new ChangeSettings(newSettings));
    }
  }
}
