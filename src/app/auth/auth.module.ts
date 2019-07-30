import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../../environments/environment';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserEffects, userReducer } from './User';
import { LoginComponent } from './components/login/login.component';

// TODO user reducer

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AngularFireAuthModule,
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class AuthModule {}
