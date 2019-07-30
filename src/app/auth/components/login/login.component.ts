import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, GetUser } from '../../User';
import { Store } from '@ngrx/store';
import { UserService } from '../../services/user.service';

interface AuthState {
  user: User;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user$: Observable<User>;

  constructor(
    private store: Store<AuthState>,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user$ = this.store.select('user');
    this.store.dispatch(new GetUser());
  }

  googleLogin() {
    const credentials = {
      login: 'admin@admin.com',
      password: 'admin1'
    };
    this.userService.googleLogin(credentials);
  }

  logout() {
    this.userService.logout();
  }
}
