import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';
import { MasterService } from './../../../masterservices/master.service';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl,
 } from '@angular/forms';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

export class CustomValidator {
  // Number only validation
  static numeric(control: AbstractControl) {
    // console.log(control.value);
    let val = control.value;
    if (val === null || val === '' || val === undefined) { return null; }
    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) { return { 'invalidNumber': true }; }
    return null;
  }
}


@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class StudentDetailComponent implements OnInit {

  id: String;
  selected: any = {};
  updateForm: FormGroup;
  users = [];
  genders = [];
  classes = [];
  religions = [];
  castes = [];
  castesfiltered = [];
  countries = [];
  isSave = true;
  disableSave = false;
  maxLength = 10;
  // tslint:disable-next-line:max-line-length
  constructor(private masterService: MasterService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }
  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      classNo: ['', [Validators.required, CustomValidator.numeric]],
      admNo: ['', Validators.required],
      myRelegion: '',
      myClass: ['', Validators.required],
      myCaste: '',
      dob: ['', Validators.required],
      dateOfJoin: [new Date(), Validators.required],
      TCIssued: false,
      myUser: '',
      myGender: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]*$'),
          Validators.minLength(10), Validators.maxLength(10)]],
      parentName: ['', Validators.required],
      loginAutoCreated: true,
      address: '',
      dialCode: '',
    });
  }
  // tslint:disable-next-line:member-ordering


  ngOnInit() {
    // return;
    // console.log(this.route.params);
    this.masterService.getUsers()
    .subscribe(
      res => this.users = res,
      err => console.log(err)
    );
    this.masterService.getGender()
    .subscribe(
      res => this.genders = res,
      err => console.log(err)
    );
    this.masterService.getReligions()
    .subscribe(
      (res) => {this.religions = res; },
      err => console.log(err)
    );
    this.masterService.getCastes()
    .subscribe(
      (res) => {this.castes = res;
          this.castesfiltered = res;
      },
      err => console.log(err)
    );
    this.masterService.getClasses()
    .subscribe(
      res => this.classes = res,
      err => console.log(err)
    );
    this.masterService.getCountries()
      .subscribe(
        res => {
          this.countries = res;
          const ind = this.countries.find(c => c._id === 'IN');
          this.updateForm.get('dialCode').setValue(ind);
        },
        err => console.log(err)
    );
    // this.castesfiltered = this.castes;
    if (this.id !== '__new'){
      this.updateForm.get('myUser').clearValidators();
      this.updateForm.get('myUser').updateValueAndValidity();
      this.updateForm.get('myUser').disable();
      this.updateForm.get('myUser').setValue(undefined);
    }
    this.route.params.subscribe(params => {
      this.id = params.id;
      // console.log('ngOnInit: ' + this.id);
      // console.log(this.id);
      if (this.id !== '__new'){
        this.isSave = false;
        this.masterService.getStudentById(this.id).subscribe(res => {
          this.selected = res;
          // console.log(this.selected);
          // tslint:disable-next-line:forin
          for (const field in this.updateForm.controls) {
            this.updateForm.get(field).setValue(this.selected[field]);
            // console.log(this.selected[field]);
            if (field === 'dialCode') {
                const c = this.countries.find(cc => cc.dialCode === this.selected[field]);
                // console.log(c);
                if (c) {
                  this.maxLength = c.maxLength;
                  this.updateForm.get(field).setValue(c.dialCode);
                }
            }
          }
        });
      }
    });
  }
  get f() { return this.updateForm.controls; }
  get name() { return this.updateForm.get('name'); }
  changedReligion(code){
    console.log(code);
    this.castesfiltered = this.castes.filter(f => f.religions === code);
    if(this.castesfiltered.length > 0) {
      this.updateForm.get('myCaste').setValue(code);
    }
  }
  // testing
  onMobileNoChange(searchValue: string) {
    console.log(searchValue);
    if (!this.updateForm.get('loginAutoCreated').value) {
      this.masterService.getUserByMobile(searchValue)
      .subscribe(u => {
        // console.log(u);
        if  ( u.length > 0 ) {
          this.updateForm.get('myUser').setValue(u[0]._id);
        }
      });
    }
  }
  onDeselectLogin(){
    this.updateForm.get('myUser').setValue(undefined);
  }
  onCountrySelection(code){
    // console.log(this.maxLength, code);
    const c = this.countries.find(cc => cc.dialCode === code);
    if (this.maxLength !== c.maxLength) {
      this.updateForm.get('mobileNo').setValue('');
    }
    this.maxLength = c.maxLength;
    this.selected['dialCode'] = code;
    // tslint:disable-next-line:max-line-length
    this.updateForm.controls['mobileNo'].setValidators([Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(this.maxLength) , Validators.maxLength(this.maxLength)]);
  }
  addrel(){
    const rel: any = {};
    rel['_id'] = 'AA';
    rel['name'] = 'AAAA';
    this.masterService.addRelegion(rel).subscribe((res) => {
      this.snackBar.open(`Student ${res['message']}`, 'OK', {
        duration: 3000
      });

    });
  }
  updateChecked(e) {
    // console.log(e.checked);
    if (e.checked) {
      this.updateForm.get('myUser').clearValidators();
      this.updateForm.get('myUser').updateValueAndValidity();
      this.updateForm.get('myUser').disable();
      this.updateForm.get('myUser').setValue(undefined);
    } else {
      this.updateForm.get('myUser').setValidators([Validators.required]);
      this.updateForm.get('myUser').updateValueAndValidity();
      this.updateForm.get('myUser').enable();
    }
  }
  updateStudent() {

    if (this.updateForm.invalid) {
      return;
    }
    // console.log(this.isSave);
    // tslint:disable-next-line:forin
    for (const field in this.updateForm.controls) {
      if (!this.isSave && field === 'loginAutoCreated') {
        delete this.selected[field];
      } else {
        this.selected[field] = this.updateForm.get(field).value;
      }
    }
    this.selected['schoolid'] = localStorage.getItem('schoolid');
     // console.log( this.selected);
    const loginCreate = this.updateForm.get('loginAutoCreated').value ? 1 : 0;
    this.masterService.updateStudent(`${this.id}|${localStorage.getItem('username')}|${localStorage.getItem('schoolid')}|${loginCreate}`
        , this.selected).subscribe((res) => {
      this.snackBar.open(`Student ${res['message']}`, 'OK', {
        duration: 3000
      });
      if (this.id === '__new' && res['status'] === 'S' ) {
      // this.router.navigate([`/example`]);
        this.disableSave = true;
        this.router.navigate([`/studentdetail/${res['id']}`]);
      }
    });

  }

}

