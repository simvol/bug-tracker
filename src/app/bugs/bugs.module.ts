import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { bugsReducer, BugsEffects } from './Bug';
import { EffectsModule } from '@ngrx/effects';
import { BugComponent } from './components/bug.component';

@NgModule({
  declarations: [BugComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('bugs', bugsReducer),
    EffectsModule.forFeature([BugsEffects])
  ],
  exports: [BugComponent]
})
export class BugsModule {}
