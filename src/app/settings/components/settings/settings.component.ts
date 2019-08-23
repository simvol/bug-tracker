import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';
import { debounceTime, tap, switchMap, takeLast } from 'rxjs/operators';
import { IErrorType } from '../../Settings';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Observable } from 'rxjs';

const MS_TILL_SAVE = 2000;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  errorTypesForm: FormGroup = new FormGroup({
    errorTypesArray: new FormArray([])
  });

  constructor(
    private settingsService: SettingsService,
    public dialog: MatDialog
  ) {}

  get types() {
    return (this.errorTypesForm.get('errorTypesArray') as FormArray).controls;
  }

  ngOnInit() {
    this.settingsService.getSettings().subscribe(value => {
      if (value.errorTypes) {
        this.addErrorTypesData(value.errorTypes);
      }
    });

    this.addFormChangeListener();
  }

  addFormChangeListener() {
    this.errorTypesForm
      .get('errorTypesArray')
      .valueChanges.pipe(
        debounceTime(MS_TILL_SAVE),
        tap(values => this.settingsService.saveSettings(values))
      )
      .subscribe();
  }

  addErrorTypesData(errorTypes: any[]) {
    const fromArray = this.errorTypesForm.get('errorTypesArray') as FormArray;
    fromArray.clear();
    errorTypes.map(item => {
      fromArray.push(this.createErrorType(item));
    });
  }

  addEmptyErrorType() {
    this.settingsService.addErrorType();
  }

  removeErrorType(id: string) {
    this.openConfirmationDialog().subscribe(result => {
      if (result === true) {
        this.settingsService.removeErrorType(id);
      }
    });
  }

  createErrorType(errorType: IErrorType) {
    return new FormGroup({
      id: new FormControl(errorType.id),
      label: new FormControl(errorType.label),
      regexp: new FormControl(errorType.regexp)
    });
  }

  openConfirmationDialog(): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to delete this error type?' }
    });
    return dialogRef.afterClosed();
  }
}
