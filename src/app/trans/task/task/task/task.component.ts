import { TaskService } from './../../../../transervice/task.service';
import { MasterService } from './../../../../masterservices/master.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { MatSnackBar, MatDatepickerInputEvent } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, FormGroupDirective, NgForm,
 } from '@angular/forms';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, ErrorStateMatcher} from '@angular/material/core';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class TaskComponent implements OnInit {
  id: String;
  selected: any = {};
  updateForm: FormGroup;
  users = [];
  types = [];
  teachers = [];
  type = '';
  selectedType: any = {};
  classes = [];
  subjects = [];
  teacher: any = {};
  isSave = false;
  disableSave = false;
  error = '';
  matcher = new MyErrorStateMatcher();
  amountError ='';
  pPlaceholder = `Penalty after 1<sub>st <sub/> close`;
  // tslint:disable-next-line:max-line-length
  constructor(private masterService: MasterService, private taskService: TaskService, private router: Router,
    private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder, private datePipe: DatePipe) {
    this.createForm();
  }
  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      message: '',
      start: [new Date(), Validators.required],
      end1: [new Date(), Validators.required],
      end2: [new Date(), Validators.required],
      end3: [new Date(), Validators.required],
      type: ['', Validators.required],
      mySubject: ['', Validators.required],
      // createdby: '',
      amount: [0, Validators.required],
      penalty1: [0, Validators.required],
      penalty2: [0, Validators.required],
      penalty3: [0, Validators.required],
      sendSMS: [false, Validators.required],
      // schoolid: [localStorage.getItem('schoolid'), Validators.required],
      myClasses: ['', Validators.required],
      autoClose: [false, Validators.required],
      canView: '',
      totalGrade: 10,
    }, { validator: [this.checkDateEnd1, this.checkDateEnd2, this.checkDateEnd3] });
  }

  checkDateEnd1(group: FormGroup) {
    const end1 = new Date(group.controls.end1.value);
    const start = new Date(group.controls.start.value);
    // console.log(end1.getTime() , start.getTime());
    const check = end1.getTime() < start.getTime();
    // console.log(check);
    return (end1.getTime() < start.getTime()) ? { end1Less: true } : null;
  }
  checkDateEnd2(group: FormGroup) {
    const end1 = new Date(group.controls.end2.value);
    const start = new Date(group.controls.end1.value);
    return (end1.getTime() < start.getTime()) ? { end2Less: true } : null;
  }
  checkDateEnd3(group: FormGroup) {
    const end1 = new Date(group.controls.end3.value);
    const start = new Date(group.controls.end2.value);
    return (end1.getTime() < start.getTime()) ? { end3Less: true } : null;
  }
  ngOnInit() {
    const currentDate = new Date();
    this.updateForm.get('message').disable();
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.type = params.type;
      console.log(this.id, this.type);
      this.taskService.getMastersForTask(localStorage.getItem('userid'))
      .subscribe((resMasters) => {
        if (resMasters.teacher) {
            this.teacher = resMasters.teacher;
            this.subjects = resMasters.subjects;
            this.classes = resMasters.classes;
            this.types = resMasters.types;
            this.teachers = resMasters.teachers;
            this.selectedType = this.types.find(t => t._id === this.type);
            if (this.id !== '__new') {
              this.isSave = false;
              if (this.fillFromMemory()) {
                this.updateFormData();
              } else {
                this.taskService.getTaskById(this.id).subscribe(res => {
                  this.selected = res;
                  this.updateFormData();
                });
              }
            } else {
              this.isSave = true;
              if (this.fillFromMemory()) {
                this.updateFormData();
              } else {
                if (this.type) {
                  this.updateForm.get('type').setValue(this.type);
                }
                if (this.subjects.length > 0) {
                  this.updateForm.get('mySubject').setValue(this.subjects[0]._id);
                }
              }
            }
        }
      }, err => {
        this.error = err.error;
        console.log(err.error);
      });
    });
  }
  fillFromMemory(): boolean {
    if (this.taskService.taskData.task) {
        // console.log(this.taskService.taskData.task);
        this.selected = this.taskService.taskData.task;
        return true;
    }
    return false;
  }
  updateFormData() {
    // console.log(this.selected);
    for (const field in this.updateForm.controls) {
      if (field === 'canView') {
        this.updateForm.get(field).setValue(this.getSelectData(this.selected[field], this.teachers));
      } else if (field === 'myClasses') {
          this.updateForm.get(field).setValue(this.getSelectData(this.selected[field], this.classes));
      } else {
        this.updateForm.get(field).setValue(this.selected[field]);
      }
    }
  }
  isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }
  getSelectData(dataFromTable, listData) {
    const array: any[] = [];
    array.length = 0;
    dataFromTable.forEach((value, index) => {
      let v = value._id;   // objects comes from service momery -task
      if (v === undefined) {
        v = value;   // _id comes from database
      }
      const itemIndex = listData.find(x => x._id === v);
      array.push(itemIndex);
    });
    return array;
  }
  changeDate(type: string, event: MatDatepickerInputEvent<Date>) {
    //  console.log(event.targetElement.attributes['formControlName'].value);
    if (type === 'change') {
      switch (event.targetElement.attributes['formControlName'].value) {
        case 'start' :
            // console.log(event.value['_d'].getTime());
            this.setDate('end1', event.value['_d']);
            this.setDate('end2', this.updateForm.get('end1').value);
            this.setDate('end3', this.updateForm.get('end2').value);
            break;
        case 'end1' :
            this.setDate('end2', event.value['_d']);
            this.setDate('end3', this.updateForm.get('end2').value);
            break;
        case 'end2' :
            // console.log(event.value['_d']);
            // console.log(this.updateForm.get('end3').value);
            this.setDate('end3', event.value['_d']);
            break;
      }
    }
  }
  setDate(field, dt) {
    // console.log(this.updateForm.get(field).value as Date);
    // console.log(dt);
    const dt1 = new Date(dt);
    const dt2 = new Date(this.updateForm.get(field).value);
    try {
      if (dt1.getTime() > dt2.getTime()) {
        this.updateForm.get(field).setValue(dt);
      }
    } catch(err){
      console.log(err);
    }
  }
  update() {
    if (this.updateForm.invalid) {
      return;
    }
    if (this.selectedType.amount && this.updateForm.get('amount').value <= 0 ){
      this.amountError = 'Amount can\'t be zero ';
      console.log(this.amountError);
      return;
    }
    // tslint:disable-next-line:forin
    for (const field in this.updateForm.controls) {
      this.selected[field] = this.updateForm.get(field).value;
      // console.log(field + ':' + this.selected[field]);
    }
    this.selected['schoolid'] = localStorage.getItem('schoolid');
    this.selected['createdby'] = this.teacher['_id'];

    this.taskService.updateTask(`${this.id}|${localStorage.getItem('username')}|${localStorage.getItem('schoolid')}`,
    this.selected).subscribe((res) => {
      // console.log(res);
      this.snackBar.open(`Task ${res['message']}`, 'OK', {
        duration: 3000
      });
      if (this.id === '__new' && res['status'] === 'S' ) {
        this.disableSave = true;
      }

      // this.updateForm.dirty = false;
      // this.updateForm.reset();
      this.updateForm.markAsPristine();
      this.router.navigate([`/task/${this.type}/${res['id']}`]);
    }, (err) => {
      console.log(err);
      this.snackBar.open(err.error, 'OK', {
        duration: 3000
      });
    });

  }
  onAmountChange(e){
    this.amountError = '';
  }
  updateChecked(e) {
  //  console.log(e.checked);
    if (!e.checked) {
      this.updateForm.get('message').clearValidators();
      this.updateForm.get('message').updateValueAndValidity();
      this.updateForm.get('message').setValue(undefined);
      this.updateForm.get('message').disable();
    } else {
      this.updateForm.get('message').setValidators([Validators.required]);
      this.updateForm.get('message').updateValueAndValidity();
      this.updateForm.get('message').enable();
    }
  }
  studentList() {
    // console.log(this.updateForm.get('myClasses').value);
    if (this.selectedType.amount && this.updateForm.get('amount').value <= 0 ){
      this.amountError = 'Amount can\'t be zero ';
      console.log(this.amountError);
      return;
    }
    // tslint:disable-next-line:forin
    for (const field in this.updateForm.controls) {
      this.selected[field] = this.updateForm.get(field).value;
    }
    this.selected['start'] = this.datePipe.transform(this.updateForm.get('start').value, 'yyyy-MM-dd');
    this.selected['end1'] = this.datePipe.transform(this.updateForm.get('end1').value, 'yyyy-MM-dd');
    this.selected['end2'] = this.datePipe.transform(this.updateForm.get('end2').value, 'yyyy-MM-dd');
    this.selected['end3'] = this.datePipe.transform(this.updateForm.get('end3').value, 'yyyy-MM-dd');

    this.selected['schoolid'] = localStorage.getItem('schoolid');
    if (!this.selected['createdby']) {
      this.selected['createdby'] = this.teacher['_id'];
    }
    // console.log(this.selected['createdby']);
    if (this.selected['canView'].length === 0) {
      const array: any[] = [];
      array.length = 0;
      const creator = this.teachers.find(x => x._id === this.selected['createdby']);
      array.push(creator);
      this.selected['canView'] = array;
    } else {
      const itemIndex = this.selected['canView'].find(x => x._id === this.selected['createdby']);
      if (!itemIndex) {
        const creator = this.teachers.find(x => x._id === this.selected['createdby']);
        this.selected['canView'].push(creator);
        // console.log(creator);
      }
    }
    // console.log(this.selected);
    this.taskService.setTaskData('task', this.selected);
    this.taskService.setTaskType(this.type);
    this.router.navigate([`/task-dashboard/${this.type}/student-task`]);
  }
}

