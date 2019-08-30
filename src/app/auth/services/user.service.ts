import { Injectable, OnInit } from '@angular/core';
import { User, GoogleLogin, Logout } from '../User';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

interface AuthState {
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  constructor(
    private store: Store<AuthState>,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // TODO is this the right way of doing it?
    // this.store
    //   .select('userMessage')
    //   .subscribe(value => this.snackBar.open(value.message));
  }

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
