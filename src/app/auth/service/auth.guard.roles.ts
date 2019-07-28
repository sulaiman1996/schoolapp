import { MasterService } from './../../masterservices/master.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
// import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardRoles implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router, private masterService: MasterService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = route.data['roles'] as Array<string>;
    // console.log(state.url);
    // console.log('roles: ' + roles);
    for (const role of roles) {
      // console.log(role);
      if (this._authService.loggedInAdmin(role)) {
        return true;
      }
    }
      this.masterService.setselectorMessage('You have no access right for this module:' + state.url.replace('/',''));
      this._router.navigate(['selector']);
      return false;
  }
}
