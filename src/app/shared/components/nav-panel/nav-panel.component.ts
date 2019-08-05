import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/User';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-panel',
  templateUrl: './nav-panel.component.html',
  styleUrls: ['./nav-panel.component.scss']
})
export class NavPanelComponent implements OnInit {
  user$: Observable<User>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.user$ = this.store.select('user');
  }
}
