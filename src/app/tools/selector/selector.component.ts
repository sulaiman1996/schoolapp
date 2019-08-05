import { Component, OnInit } from '@angular/core';
import { MasterService } from './../../masterservices/master.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl,
  FormGroupDirective, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {
  message ='';
  showMessage = false;
  userType = '';
  username = '';
  classes = [];
  students = [];
  academics = [];
  userid = '';
  showClass = false;
  showStudent = false;
  academicFromDate = '';
  academicToDate = '';
  form: FormGroup;
  constructor(
    private masterService: MasterService, private fb: FormBuilder, private router: Router, private datePipe: DatePipe) {
    this.createForm();
    this.message = this.masterService.selectorMessage;
    this.showMessage = ! (this.message === '');
  }
  createForm() {
    this.form = this.fb.group({
      myClass: [''],
      student: [''],
      academic: [''],
    });
  }
  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.userType = localStorage.getItem('userType');
    if (this.userType === 'Parent') { this.showStudent = true; }
    if (this.userType === 'Teacher') { this.showClass = true; }
    if (this.userType === 'Admin') { this.showClass = true; }
    this.userid = localStorage.getItem('userid');
    this.masterService.getClasses()
      .subscribe(
        res => this.classes = res,
        err => console.log(err)
      );
    this.masterService.getAcademicYears()
      .subscribe(
        res => this.academics = res,
        err => console.log(err)
      );
    this.masterService.getStudentsByUser(this.userid)
      .subscribe(
        res => this.students = res,
        err => console.log(err)
      );
      this.form.get('student').setValue(localStorage.getItem('student'));
      this.form.get('myClass').setValue(localStorage.getItem('myClass'));
      this.form.get('academic').setValue(localStorage.getItem('academic'));
  }
  changedReligion(e) {
    // this.castesfiltered = this.castes.filter(f => f.religions === code);
    // if(this.castesfiltered.length > 0) {
    //   this.updateForm.get('myCaste').setValue(this.castesfiltered[0]._id);
    // }
    const ss = this.academics.find(f => f._id === e.value);
    console.log(ss);
    this.academicFromDate = this.datePipe.transform(ss.dateFrom, 'yyyy-MM-dd');
    this.academicToDate = this.datePipe.transform(ss.dateTo, 'yyyy-MM-dd');
  }
  updateData(){
    if (this.showClass) {
      localStorage.setItem('myClass', this.form.get('myClass').value);
    }
    if (this.showStudent){
      localStorage.setItem('student', this.form.get('student').value);
    }
    if (this.academicFromDate !== ''){
      localStorage.setItem('academicDateFrom', this.academicFromDate);
    }
    if (this.academicToDate !== '') {
      localStorage.setItem('academicDateTo', this.academicToDate);
    }
    localStorage.setItem('academic', this.form.get('academic').value);

    switch (this.userType) {
      case 'Teacher': this.router.navigate([`/attendance`]); break;
      case 'Parent': this.router.navigate([`/markProgressSummary/parent`]); break;
      case 'Admin': this.router.navigate([`/students`]); break;
    }
  }
}
