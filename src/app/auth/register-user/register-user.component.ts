import { MasterService } from './../../masterservices/master.service';
import { Location } from '@angular/common';
import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatSnackBar, ErrorStateMatcher } from '@angular/material';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { DISABLED } from '@angular/forms/src/model';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  registerUserData = {};
  parents = ['--', 'Father', 'Mother', 'Guardian'];
  userTypes = ['Parent', 'Teacher', 'Admin', 'PTA'];
  loginForm: FormGroup;
  userid: string;
  edit = false;
  passwordLabel = 'Password' ;
  header = 'User Registration';
  userType = '';
  matcher = new MyErrorStateMatcher();
  IsAdmin = false;
  parentLogged = true;
  constructor(private _auth: AuthService, private masterService: MasterService, private _router: Router, private fb: FormBuilder,
    private snackBar: MatSnackBar, private route: ActivatedRoute , private location: Location) {
    this.createForm();
  }
  createForm() {
    this.userid = '__new';
    this.userType = localStorage.getItem('userType');
    this.parentLogged = this.userType === 'Parent';
    this.IsAdmin = this.userType === 'Admin';
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, ] ],
      parent: '',
      name: '',
      userType: ['', [Validators.required, ] ],
      schoolid: [{value: '', disabled: !this.IsAdmin}, [Validators.required, ] ],
    }, { validator: [this.checkPasswords, this.checkOldPassword] });
  }
  checkOldPassword(group: FormGroup) {
    const pass = group.controls.password.value;
    let confirmPass = pass;
    // console.log('check');
    if (group.controls.oldPassword) {
      confirmPass = group.controls.oldPassword.value;
    }
    return (pass === confirmPass) ? null : { notSameOld: true };
  }
  checkPasswords(group: FormGroup) {
    let pass = '';
    let confirmPass = '';
    if (group.controls.newPassword) {
        pass = group.controls.newPassword.value;
    }
    if (group.controls.confirmPassword) {
      confirmPass = group.controls.confirmPassword.value;
    }
    return (pass === confirmPass) ? null : { notSame: true };
  }
  ngOnInit() {

    // this.loginForm.addControl('', new FormControl('', Validators.required, disabled: this.disabled));
    this.route.params.subscribe(params => {
      if (params.id) {
        this.edit = true;
        console.log('edit');
        console.log(this.userid);
        this.passwordLabel = 'Old Password';
        this.header = 'Profile Update';
        this.loginForm.addControl('newPassword', new FormControl('', Validators.required));
        this.loginForm.addControl('confirmPassword', new FormControl(''));
        this.loginForm.addControl('oldPassword', new FormControl(''));
        this.userid = localStorage.getItem('userid');
        this.masterService.getUserById(this.userid)
        .subscribe(
          res => {
            this.registerUserData = res;
            this.loginForm.get('email').setValue(this.registerUserData['email']);
            this.loginForm.get('parent').setValue(this.registerUserData['parent']);
            this.loginForm.get('userType').setValue(this.registerUserData['userType']);
            this.loginForm.get('oldPassword').setValue(this.registerUserData['password']);
            this.loginForm.get('name').setValue(this.registerUserData['name']);
            this.loginForm.get('schoolid').setValue(this.registerUserData['schoolid']);
          },
          err => console.log(err)
        );
      }
    });
  }
  registerUser() {
    // console.log(this.registerUserData);
    this.registerUserData['email'] = this.loginForm.get('email').value;
    this.registerUserData['parent'] = this.loginForm.get('parent').value;
    this.registerUserData['userType'] = this.loginForm.get('userType').value;
    const pField = this.edit ? 'newPassword' : 'password';
    this.registerUserData['password'] = this.loginForm.get(pField).value;
    this.registerUserData['name'] = this.loginForm.get('name').value;
    if(this.loginForm.get('schoolid').value){
      this.registerUserData['schoolid'] = this.loginForm.get('schoolid').value;
    } else {
      this.registerUserData['schoolid'] = localStorage.getItem('schoolid');
    }
    // tslint:disable-next-line:forin
    // for (const field in this.loginForm.controls) {
    //   this.registerUserData[field] = this.loginForm.get(field).value;
    //   // console.log(field + ':' + this.selected[field]);
    // }
    this._auth.registerUser(this.registerUserData, this.userid)
    .subscribe(
      res => {
        console.log(res);
        if (res.status === 'S') {
          // console.log('subscribe-client: ' + res);
          // console.log('before component', res);
          // localStorage.setItem('token', res.token);
          // localStorage.setItem('username', this.registerUserData['email']);
          // console.log(localStorage.getItem('username'));
           this._router.navigate(['/dashboard']);
          this.snackBar.open(`User saved`, 'OK', {
            duration: 2000
          });
        } else {
          this.snackBar.open(`Invalid entry! ${res.message}`, 'OK', {
              duration: 3000
          });
        }
      },
      err => {
        console.log( err)
        // this.snackBar.open(`Invalid entry ${err}`, 'OK', {
        //   duration: 1500
        // });
      }
    )
  }
  navigateBack() {
    this.location.back();
  }
}
