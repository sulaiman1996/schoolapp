import { Component, OnInit } from '@angular/core';
import { MasterService } from './../../../masterservices/master.service';
import { MarksentryService } from './../../../transervice/marksentry.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSnackBar, MatDatepickerInputEvent } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Location } from '@angular/common';
import { toDate } from '@angular/common/src/i18n/format_date';
import { element } from 'protractor';
import { DatePipe } from '@angular/common';
export interface StudentsData {
  teachers: string;
  students: string;
  myClass: string;
  mySubject: string;
  topics: string;
  description: string;
  dates: Date;
  exams: string;
  classNo: number;
  name: string;
  maxMark: number;
  attendance: boolean;
  marks: number;
  currentAcademic: string;
  schoolid: string;
}

@Component({
  selector: 'app-marksentry',
  templateUrl: './marksentry.component.html',
  styleUrls: ['./marksentry.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class MarksentryComponent implements OnInit {
  displayedColumns: string[] = [ 'classNo', 'name', 'attendance', 'marks'];
  selection = new SelectionModel<StudentsData>(true, []);
  form: FormGroup;
  classes = [];
  subjects = [];
  students = [];
  userid: string;
  teacher: any = {};
  dataSource: DataSource<any>;
  tableData = [];
  marks = [];
  exmas = [];
  academic = [];
  canDelete = false;
  saveCaption = 'Save';
  constructor(private masterService: MasterService, private markEntryService: MarksentryService,
    private fb: FormBuilder, private snackBar: MatSnackBar,  private location: Location, private datePipe: DatePipe) {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      myClass: ['', Validators.required],
      exams: ['', Validators.required],
      mySubject: ['', Validators.required],
      dates: ['', Validators.required],
      maxMark: ['', Validators.required],
      topics: [''],
    });
  }

  ngOnInit() {
    this.userid = localStorage.getItem('userid');
    const currentDate = new Date();
    this.form.get('dates').setValue (currentDate);
    this.masterService.getMastersForMark(this.userid)
    .subscribe(
      res => {
        this.exmas = res.exam;
        this.teacher = res.teacher;
        this.subjects = res.subjects;
        this.classes = res.classes;
        this.academic = res.academic;
        if (this.subjects.length > 0) {
          this.form.get('mySubject').setValue(this.subjects[0]._id);
        }
        if (this.exmas.length > 0) {
          this.form.get('exams').setValue(this.exmas[0]);
        }
        if (this.classes.length > 0) {
          this.form.get('myClass').setValue(this.classes[0]._id);
          // this.fillStudentData();
        }
      }
    );
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    // this.changedFormData('');
  }
  examChanged(code) {
    if ( this.tableData.length > 0){
      const dt = this.datePipe.transform( this.form.get('dates').value, 'yyyy-MM-dd') + 'T00:00:00.000Z';
      const currentAcademic = this.academic.find(x => x.dateFrom <= dt
        && x.dateTo >= dt);
        if (currentAcademic){
          // tslint:disable-next-line:max-line-length
          const param = `${this.form.get('myClass').value}|${this.form.get('mySubject').value}|${this.form.get('exams').value._id}|${currentAcademic._id}|${localStorage.getItem('schoolid')}`;
          this.markEntryService.getStudentMarks(param)
          .subscribe(
            (res) => {
              this.canDelete = false;
              const marks = res.mark;
              this.saveCaption = 'Save';
              if (marks.length > 0 ) {
                this.students = res.students;
                this.canDelete = true;
                this.saveCaption = 'Update';
                this.prepareTableData(currentAcademic);
              } else {
                this.saveCaption = 'Save As';
              }
            }
            , err => console.log(err)
            );
        }
    }
    // this.changedFormData(code)
  }
  classChanged(code) {
    // this.fillStudentData();
    this.changedFormData(code)
  }
  changedFormData(code) {
    this.canDelete = false;
    this.tableData.length = 0;
    this.dataSource = new MatTableDataSource(this.tableData);
  }
  go() {
    this.fillStudentData();
  }
  fillStudentData() {
    const dt = this.datePipe.transform( this.form.get('dates').value, 'yyyy-MM-dd') + 'T00:00:00.000Z';
    const currentAcademic = this.academic.find(x => x.dateFrom <= dt
      && x.dateTo >= dt);
    if (currentAcademic){
      // tslint:disable-next-line:max-line-length
      const param = `${this.form.get('myClass').value}|${this.form.get('mySubject').value}|${this.form.get('exams').value._id}|${currentAcademic._id}|${localStorage.getItem('schoolid')}`;
      this.markEntryService.getStudentMarks(param)
      .subscribe(
        (res) => {
          // console.log(res);
          this.canDelete = false;
          this.students = res.students;
          const marks = res.mark;
          this.saveCaption = 'Save';
          if (marks.length > 0 ) {
            this.canDelete = true;
            this.saveCaption = 'Update';
          } else {

          }
          // console.log(this.students[0]['name']);
          // tslint:disable-next-line:prefer-const
          this.prepareTableData(currentAcademic);
        },
        err => console.log(err)
        );
      }
  }
  prepareTableData(currentAcademic){
    const len = this.students.length;
    // console.log(len);
    let std: StudentsData;
    this.tableData.length = 0;
    let myMark;
    let maxMark = '';
    let atten;
    let topic = '' ;
    for (let i = 0; i < len; i++) {
      myMark = 0 ;
      atten = true ;
      if (this.students[i]['marks'].length !== 0) {
        myMark = this.students[i]['marks'][0].mark;
        atten = this.students[i]['marks'][0].attendance;
        maxMark = this.students[i]['marks'][0].maxMark;
        topic = this.students[i]['marks'][0].topics;
        this.form.get('dates').setValue(this.students[i]['marks'][0].dates);
      }

      std = {
          teachers: this.teacher['_id'],
          students: this.students[i]['_id'],
          myClass: this.form.get('myClass').value,
          mySubject: this.form.get('mySubject').value,
          topics: this.form.get('topics').value,
          description: '',
          dates: this.form.get('dates').value,
          exams: this.form.get('exams').value._id,
          classNo: this.students[i]['classNo'],
          name: this.students[i]['name'],
          attendance: atten,
          marks: myMark === 0 ? null : myMark,
          maxMark: 0,
          currentAcademic: currentAcademic._id,
          schoolid: localStorage.getItem('schoolid'),
      };
      this.tableData.push(std);
      // console.log(this.students[i]['marks'][0].mark);
    }
    if (maxMark !== '') {
      this.form.get('maxMark').setValue(maxMark);
    }
    this.form.get('topics').setValue(topic);

    this.dataSource = new MatTableDataSource(this.tableData);
    // console.log(this.tableData);
  }
  onChangeCheckBox(event, index, item) {
    item.attendance = !item.attendance;
    if (!item.attendance) {
      item.marks = 0;
    }
    // console.log(item);
    // console.log(index);
  }
  onChangeMark(event, index, item) {
    // item = !item.attendance;
    // if (!item.attendance) {
    //   item.marks = 0;
    // }
    // console.log(index);
   console.log('onChangeMark: ' + index);
    // this.canDelete = false;
  }
  navigateBack() {
    this.location.back();
  }
  update() {
    let errString = '';
    this.tableData.forEach(e => {
      const toDo = e as StudentsData;
      toDo.dates = this.form.get('dates').value;
      toDo.topics = this.form.get('topics').value;
      toDo.maxMark = this.form.get('maxMark').value;
      toDo.mySubject = this.form.get('mySubject').value;
      toDo.exams = this.form.get('exams').value._id;
      toDo.dates = this.form.get('dates').value;

      if (!toDo.attendance) {
        toDo.marks = 0;
        console.log(toDo.attendance);
      }
      if (!toDo.marks) {
        toDo.marks = 0;
      }
      if (toDo.marks > toDo.maxMark) {
        errString = `${toDo.name} mark (${toDo.marks}) is greater than max mark(${toDo.maxMark})!`;
      }
      // toDo.topics = toDo.attendance ? 'P' : 'A';
      // toDo.periods = this.form.get('period').value;
      console.log(toDo.name + ': ' + toDo.marks);
    });
    if (errString !== '') {
      this.snackBar.open(errString, 'OK', {
        duration: 2000
      });
    } else {
      this.markEntryService.updateMarks(
        `${this.saveCaption}|${localStorage.getItem('username')}|${localStorage.getItem('schoolid')}`,
        this.tableData).subscribe((res) => {
        console.log(res);
        console.log(res['nInserted']);
        this.saveCaption = 'Update';
        const msg = res['nInserted'] > 1 ? 'are' : 'is';
        this.snackBar.open(`${res['nInserted']} marks ${msg} saved`, 'OK', {
          duration: 2000
        });
      });
    }
  }
  delete() {
    if (confirm(`Delete ${this.form.get('exams').value.name} marks ?`)) {
      this.markEntryService.updateMarks(`delete|${localStorage.getItem('username')}|${localStorage.getItem('schoolid')}`,
      this.tableData).subscribe((res) => {
        console.log(res);
        this.saveCaption = 'Save';
        const msg = res['ok'] === 1 ? res['n'] + ' marks are deleted' : 'Not deleted marks';
        this.snackBar.open(msg, 'OK', {
          duration: 2000
        });
      });
    }
  }
}
