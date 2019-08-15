import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizedComponent } from './components/authorized/authorized.component';
import { NavPanelComponent } from './components/nav-panel/nav-panel.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { InfoBoxComponent } from './components/info-box/info-box.component';
import { FirebaseDatePipe } from './pipes/firebase-date.pipe';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AuthorizedComponent,
    NavPanelComponent,
    PageNotFoundComponent,
    InfoBoxComponent,
    FirebaseDatePipe
  ],
  imports: [CommonModule, RouterModule, MaterialModule, LayoutModule],
  exports: [
    AuthorizedComponent,
    PageNotFoundComponent,
    InfoBoxComponent,
    FirebaseDatePipe,
    LayoutModule
  ]
})
export class SharedModule {}
