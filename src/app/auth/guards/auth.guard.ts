import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.authState.pipe(
      map(user => {
        if (!user) {
          this.router.navigate(['/login']);
        }

        return !!user;
      })
    );
  }
}
