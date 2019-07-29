import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../../environments/environment';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserEffects, userReducer } from './User';

// TODO user reducer

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class AuthModule {}
