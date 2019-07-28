import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  loginUserData = {};
  logedUser = {};
  username = '';
  loginForm: FormGroup;
  constructor(private _auth: AuthService, private _router: Router, private fb: FormBuilder, private snackBar: MatSnackBar ) {
    this.createForm();
  }

  ngOnInit() {
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, ] ],
    });
  }
  loginUser(){
    // tslint:disable-next-line:forin
    for (const field in this.loginForm.controls) {
      this.loginUserData[field] = this.loginForm.get(field).value;
      // console.log(field + ':' + this.selected[field]);
    }
    console.log(this.loginUserData);
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        console.log(res.user);
        localStorage.setItem('token', res.token);
        this.username = this.loginUserData['email'];
        console.log('User name is ' + this.username);
        localStorage.setItem('username', res.user['email']);
        localStorage.setItem('userType', res.user['userType']);
        localStorage.setItem('userid', res.user['_id']);
        localStorage.setItem('schoolid', res.user['schoolid']);
        // console.log('login user 111   ' + res.user['userType'] + localStorage.getItem['username']);
        // this.userid = localStorage.getItem('userid');
        this._router.navigate(['/dashboard']);
      },
      err => {
        console.log(err);
        this.snackBar.open(`Invalid credintials`, 'OK', {
          duration: 1500
        });
      }
    )
  }
}
