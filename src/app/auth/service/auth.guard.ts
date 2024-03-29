import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router ) {}
  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      console.log('loggedIn true')
      return true;
    } else {
      this._router.navigate(['login']);
      console.log('not loggedIn false')
      return false;
    }
  }
}

