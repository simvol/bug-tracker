import { Component, OnInit } from '@angular/core';
import { User, GetUser } from 'src/app/auth/User';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html'
})
export class AuthorizedComponent implements OnInit {
  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store.dispatch(new GetUser());
  }
}
