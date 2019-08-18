import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BugsModule } from './bugs/bugs.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { SharedModule } from './shared/shared.module';
// import { bugsReducer } from './bugs/Bug';
// import { userReducer } from './auth/User';

// function mainReducer(state: {} = {}, action: any) {
//   return state;
// }

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 10 }),
    SharedModule,
    AuthModule,
    BugsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

/**
 * TODO
 *
 * Create beautiful login page
 * Create smart components:
 *  - table
 *  - by user
 *  - by month
 *  - by day of the week
 *  - by time of the day
 *  - by browser
 */
