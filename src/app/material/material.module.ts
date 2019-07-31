import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule
  ]
})
export class MaterialModule {}
