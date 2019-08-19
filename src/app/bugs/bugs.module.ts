import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ChartsModule } from 'ng2-charts';

import { bugsReducer, BugsEffects } from './Bug';
import { EffectsModule } from '@ngrx/effects';
import { BugComponent } from './components/bug/bug.component';
import { MaterialModule } from '../material/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExploreComponent } from './components/explore/explore.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BugComponent, DashboardComponent, ExploreComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('bugs', bugsReducer),
    EffectsModule.forFeature([BugsEffects]),
    MaterialModule,
    ChartsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [BugComponent]
})
export class BugsModule {}
