import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizedComponent } from './components/authorized/authorized.component';
import { NavPanelComponent } from './components/nav-panel/nav-panel.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { InfoBoxComponent } from './components/info-box/info-box.component';

@NgModule({
  declarations: [
    AuthorizedComponent,
    NavPanelComponent,
    PageNotFoundComponent,
    InfoBoxComponent
  ],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [AuthorizedComponent, PageNotFoundComponent, InfoBoxComponent]
})
export class SharedModule {}
