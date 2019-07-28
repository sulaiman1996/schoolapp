import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl,
} from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-assign',
  templateUrl: './task-assign.component.html',
  styleUrls: ['./task-assign.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class TaskAssignComponent implements OnInit {
  message: any = {};
  msgpassed = true;
  assign: any = {};
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<TaskAssignComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private datePipe: DatePipe) {
      // this.absetees = data['absentees'];
      this.message = data['message'];
      // console.log(data['assign']);
      this.assign = data['assign'];
      this.assign.Edited = false;
      this.createForm();
    }
  createForm() {
    console.log(this.assign.totalGrade);
    this.form = this.fb.group({
      finished: false,
      finishedon: new Date(),
      amount: 0,
      penalty: 0,
      closed: false,
      remark: '',
      grade: [0, [Validators.min(0), Validators.max(this.assign.totalGrade)]],
    });
  }
  onNoClick(): void {
      this.dialogRef.close();
  }
  ngOnInit() {
    // console.log(this.assign);
    if (this.assign.amount) {
      this.form.addControl('amount', new FormControl('', Validators.required));
      this.form.get('amount').setValue(this.assign.amount);
      this.form.addControl('penalty', new FormControl(''));
      if (this.assign.assign.penalty) {
        this.form.get('penalty').setValue(this.assign.assign.penalty);
      } else {
        this.form.get('penalty').setValue(0);
      }
    } else {
      if(this.assign['assign']['grade']) {
        this.form.get('grade').setValue(this.assign['assign']['grade']);
      }
    }
    this.form.get('finished').setValue(this.assign['assign']['finished']);
    this.form.get('remark').setValue(this.assign['assign']['remark']);
    this.form.get('finishedon').setValue(this.assign['finishedDate']);
  }
  update() {
    if (this.assign.amount) {
      this.assign.amount = this.form.get('amount').value;
      if (this.form.get('penalty').value) {
        this.assign.assign.penalty = this.form.get('penalty').value;
      }
    } else {
      this.assign.assign.grade = this.form.get('grade').value;

    }
    this.assign.assign.remark = this.form.get('remark').value;
    this.assign.assign.finished = this.form.get('finished').value;
    this.assign.finishedon = this.datePipe.transform(this.form.get('finishedon').value, 'dd-MM-yyyy');
    this.assign.finishedDate = this.datePipe.transform(this.form.get('finishedon').value, 'yyyy-MM-dd');
    this.assign.Edited = true;
    console.log(this.assign);
  }


  updateChecked(e) {
    // console.log(e);
    if (e.checked) {
      this.form.get('finishedon').setValue(new Date);
    } else {
      this.form.get('finishedon').setValue(null);
    }
  }
}
