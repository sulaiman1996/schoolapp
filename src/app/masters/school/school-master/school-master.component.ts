import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MasterService } from './../../../masterservices/master.service';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, FormGroupDirective, NgForm,
  ReactiveFormsModule,} from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, ErrorStateMatcher} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule, MatButtonModule} from '@angular/material';

import { CustomValidators, ConfirmValidParentMatcher, regExps, errorMessages } from './../../../validator/custom-validator';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-school-master',
  templateUrl: './school-master.component.html',
  styleUrls: ['./school-master.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class SchoolMasterComponent implements OnInit {
  isSave = true;
  disableSave = false;
  id: String;
  selected: any = {};
  updateForm: FormGroup;
  countries = [];
  dialcode = '';
  maxLength = 10;
  matcher = new MyErrorStateMatcher();
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;
  optRegistration = 0;
  otpEntry = '';
  showOTPBox = false;
  incorrectOTP = false;
  error = '';
  constructor(private masterService: MasterService, private router: Router,
     private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
      this.maxLength = 10;
    this.createForm();
  }
  createForm() {
    this.updateForm = this.fb.group({
      _id: ['', Validators.required],
      name: ['', Validators.required],
      address1: ['', Validators.required],
      address2: '',
      city: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
      pin: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: '',
      // tslint:disable-next-line:max-line-length
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]*$'),	Validators.minLength(this.maxLength), Validators.maxLength(this.maxLength)]],
      country: ['', Validators.required],
    });
  }
  fixedlenth(group: FormGroup) {
    const value = group.controls.mobile.value as string;
    const maxLen = 10;
    return (value.length === maxLen) ? null : { notProperLength: true };
  }

  ngOnInit() {
    this.showOTPBox = false;
    this.masterService.getCountries()
      .subscribe(
        res => {
          this.countries = res;
          const ind = this.countries.find(c => c._id === 'IN');
          this.updateForm.get('country').setValue(ind);
        },
        err => console.log(err)
    );
  }
  onCountrySelection(code){
    // console.log(code);
    this.maxLength = code.maxLength;
    // const validators = [ Validators.required, Validators.minLength(5) ];

    // this.updateForm.get('mobile').setValue('9747077122');
    this.updateForm.get('mobile').setValue('');
    // tslint:disable-next-line:max-line-length
    this.updateForm.controls['mobile'].setValidators([Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(this.maxLength) , Validators.maxLength(this.maxLength)]);
    this.dialcode = code.dialCode;
  }
  resendOTP() {
    this.requestOTP();
  }
  requestOTP() {
    const message = {};
    message['phoneNo'] = this.dialcode + this.updateForm.get('mobile').value;
    message['isOTP'] = true;
    message['subject'] = 'School Registration';
    message['message'] = 'is the OTP for the school registration';
    this.optRegistration = 0;
    this.masterService.sendSMS1(message)
      .subscribe(
        res => {
          // console.log(res);
          const resReturn = res;
          if (res['otp']) {
            this.optRegistration = res['otp'];
            this.showOTPBox = true;
            console.log('OTP is '  + this.optRegistration);
          }
        } ,
        err => console.log(err)
    );
  }
  update() {
    this.error = '';
    this.incorrectOTP = false;
    if (this.showOTPBox) {
        if (+this.otpEntry === this.optRegistration) {
          console.log('Correct OTP');
          // tslint:disable-next-line:forin
          for (const field in this.updateForm.controls) {
            this.selected[field] = this.updateForm.get(field).value;
          }
          this.masterService.setSchoolDataMaster('school', this.selected);
          this.masterService.setSchoolIdRegistration(this.selected['_id']);
          const user = {userType: 'Admin', isApproved: true,
          email: this.updateForm.get('mobile').value,
          password: 'admin123', parent : '--',
          name : this.updateForm.get('name').value, schoolid: this.updateForm.get('_id').value};
          this.masterService.setSchoolDataMaster('user', user);
          console.log(this.masterService.schoolidRegistration);
          this.router.navigate([`/school-class`]);
        } else {
          this.incorrectOTP = true;
        }
    } else {
      const p = `${this.updateForm.get('_id').value}|${this.updateForm.get('mobile').value}`;
      console.log(p);
      this.masterService.getSchoolAndUser(p)
      .subscribe(
        res => {
          console.log(res);
          if(res.user){
            console.log('Mobile number already exists');
            this.error = 'Mobile number already exists';
            return;
          }
          if (res.school){
            console.log('School code already exists');
            this.error = 'School code already exists';
            return;
          }
          this.requestOTP();
        } ,
        err => console.log(err)
      );
    }
  }
}
