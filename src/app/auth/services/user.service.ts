import { Injectable, OnInit } from '@angular/core';
import { User, GoogleLogin, Logout } from '../User';
import { Store } from '@ngrx/store';

interface AuthState {
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private store: Store<AuthState>) {}

  googleLogin(credentials) {
    this.store.dispatch(new GoogleLogin(credentials));
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
