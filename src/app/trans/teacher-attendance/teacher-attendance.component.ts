import { MasterService } from './../../masterservices/master.service';
import { AttendanceService } from './../../transervice/attendance.service';

import { Component, Inject, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Location } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
export interface TeacherData {
  teachers: string;
  description: string;
  dates: string;
  att: string;
  periods: string;
  No: number;
  name: string;
  attendance: string;
  message: string;
  mySection: string;
}
@Component({
  selector: 'app-teacher-attendance',
  templateUrl: './teacher-attendance.component.html',
  styleUrls: ['./teacher-attendance.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class TeacherAttendanceComponent implements OnInit {
  displayedColumns: string[] = [ 'No', 'name', 'attendance', 'description'];
  // attendanceMaster: string[] = [ 'P', 'CL', 'CL-FN', 'CL-AN', 'OD', 'COM', 'HPL', 'LWA'];
  attendanceMaster = [];
  form: FormGroup;
  periods = [];
  sections = [];
  userid: string;
  teacher = [];
  dataSource1: DataSource<any>;
  tableData = [];
  attendance = [];
  saved = false;
  saveCaption = 'Save';
  createForm() {
    this.form = this.fb.group({
      // period: ['', Validators.required],
      mySection: ['', Validators.required],
      dates: ['', Validators.required],
    });
  }
  constructor(public dialog: MatDialog, private masterService: MasterService, private attendacneService: AttendanceService,
    private fb: FormBuilder, private snackBar: MatSnackBar,  private location: Location, private datePipe: DatePipe) {
    this.createForm();
  }

  ngOnInit() {
    this.userid = localStorage.getItem('username');
    const currentDate = new Date();
    this.form.get('dates').setValue (currentDate);
    this.masterService.getMastersForTeacherAttendance()
    .subscribe(
      (res) => {
         this.periods = res.periods;
         this.sections = res.sections;
         this.attendanceMaster = res.attType;
      },
      err => console.log(err)
    );
  }
  onChangeCheckBox(event, index, item) {
    item.attendance = !item.attendance;
    // console.log(item);
    // console.log(index);
  }
  onChangeText(value,index, item){
    item.description = value;
  }
  changedTable(event, index, item) {
    item.attendance = event.value;
    item.att = event.value;
    // console.log(item);
    // console.log(event);
  }
  isAllSelected() {
  }
  masterToggle() {

  }
  changedFormData(code) {
    this.saved = false;
    this.tableData.length = 0;
    this.dataSource1  = new MatTableDataSource(this.tableData);
    // this.fillStudentData();
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.changedFormData('');
  }
  go(){
    this.fillStudentData();
  }
  showAttendance(event, item) {
    // this.router.navigate([`/studentdetail/${item.students}`]);

  }
  fillStudentData() {
    const date = new Date(this.form.get('dates').value);
    let param = `${this.datePipe.transform(date, 'yyyy-MM-dd')}|period|`;
    param = `${param}${this.form.get('mySection').value}|${localStorage.getItem('schoolid')}`;
    this.attendacneService.getTeacherAttendance(param)
        .subscribe((res) => {
        this.teacher = res;
        const len = this.teacher.length;
        console.log(this.teacher);
        let std: TeacherData;
        this.tableData.length = 0;
        this.saved = false;
        for (let i = 0; i < len; i++) {
          std = {
              teachers: this.teacher[i]['_id'],
              mySection: this.form.get('mySection').value,
              description: this.teacher[i].atten ? this.teacher[i].atten['description'] : '',
              dates: this.datePipe.transform(date, 'yyyy-MM-dd'),
              periods: 'I',
              No: this.teacher[i]['PEN'],
              name: this.teacher[i]['name'],
              attendance: this.teacher[i].atten ? this.teacher[i].atten['att'] : 'P',
              att: this.teacher[i].atten ? this.teacher[i].atten['att'] : 'P',
              message: null
          };
          // console.log(std);
          this.tableData.push(std);
        }
        this.saveCaption = this.saved ? 'Update' : 'Save';
        this.dataSource1  = new MatTableDataSource(this.tableData);
      },
      err => console.log(err)
      );
  }
  updateAttendance() {
    const date = new Date(this.form.get('dates').value);
    this.tableData.forEach(element => {
      const toDo = element as TeacherData;
      toDo.dates = this.datePipe.transform(date, 'yyyy-MM-dd');
      // console.log(toDo.attendance);
      // toDo.att = toDo.attendance ;

      toDo.periods = 'P';
      toDo.mySection = this.form.get('mySection').value;
      // console.log(toDo);
    });
    // date/period/section
    let param = `${this.datePipe.transform(date, 'yyyy-MM-dd')}|'period'|${this.form.get('mySection').value}|`;
    param = `${param}${this.userid}|${localStorage.getItem('schoolid')}`;

    this.attendacneService.updateTeacherAttendance(param, this.tableData).subscribe((res) => {
      this.saveCaption = 'Save';
      console.log(res['nInserted']);
      const msg = res['nInserted'] > 1 ? 'are' : 'is';
      this.snackBar.open(`${res['nInserted']} attendance ${msg} saved`, 'OK', {
        duration: 2000
      });
    });
  }
  navigateBack() {
    this.location.back();
  }
}
