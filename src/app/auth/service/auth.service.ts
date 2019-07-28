
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import * as myGlobals from '../../global'; //<==== this one
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = '';
  private _loginUrl = '';
  private can = false;
  servPath = '';
  constructor(private http: HttpClient, private _router: Router) {
    // if (myGlobals.debugApp) {
    //   this.servPath = myGlobals.serverpath;
    // }
    if (environment.debug) {
      this.servPath = environment.serverpath;
    }
    this._registerUrl = this.servPath + 'api/register';
    this._loginUrl = this.servPath + 'api/login';
  }
  registerUser(user,id) {
    return this.http.post<any>(`${this._registerUrl}/${id}`, user);
  }
  loginUser(user) {
    console.log(this._loginUrl);
    return this.http.post<any>(this._loginUrl, user);
  }
  loggedIn() {
    // console.log(!!localStorage.getItem('token'))
    return !!localStorage.getItem('token')
  }
  logoutUser() {
    localStorage.removeItem('token')
    // this._router.navigate(['/events'])
    this._router.navigate(['/login'])
  }

  getToken() {
    return localStorage.getItem('token');
  }
  loggedInAdmin(userType) {
    return !!localStorage.getItem('token') && localStorage.getItem('userType') === userType;
  }
  loggedAsAdmin() {
    return !!localStorage.getItem('token') && localStorage.getItem('userType') === 'Admin';
  }
  loggedAsTeacher() {
    return !!localStorage.getItem('token') && localStorage.getItem('userType') === 'Teacher';
  }
  loggedAsParent() {
    return !!localStorage.getItem('token') && localStorage.getItem('userType') === 'Parent';
  }
}
