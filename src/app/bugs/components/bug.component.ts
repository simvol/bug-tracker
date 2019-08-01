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
  template: `
    <mat-tab-group>
      <mat-tab label="First">
        <table
          mat-table
          [dataSource]="(bugs$ | async).list"
          class="mat-elevation-z8"
        >
          <!--- Note that these columns can be defined in any order.
          The actual rendered columns are set as a property on the row definition" -->

          <!-- Position Column -->
          <ng-container matColumnDef="position">
            <th mat-header-cell *matHeaderCellDef>No.</th>
            <td mat-cell *matCellDef="let element; let i = index">
              {{ i + 1 }}
            </td>
          </ng-container>

          <!-- Name Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>User Email</th>
            <td mat-cell *matCellDef="let element">{{ element.userEmail }}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-tab>
      <mat-tab label="Second"> Content 2 </mat-tab>
      <mat-tab label="Third"> Content 3 </mat-tab>
    </mat-tab-group>
  `,
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
