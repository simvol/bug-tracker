import { Injectable, OnInit } from '@angular/core';
import { User, GoogleLogin, Logout } from '../User';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from '@angular/fire/auth';

interface AuthState {
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private store: Store<AuthState>,
    private afAuth: AngularFireAuth
  ) {}

  googleLogin(credentials) {
    this.store.dispatch(new GoogleLogin(credentials));
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  get authState() {
    return this.afAuth.authState;
  }
}
