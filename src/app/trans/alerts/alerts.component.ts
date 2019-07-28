import { TaskService } from './../../transervice/task.service';
import { Component, OnInit } from '@angular/core';
import { MasterService } from './../../masterservices/master.service';
import {FormBuilder, FormGroup } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AttendanceService } from './../../transervice/attendance.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  students: any = [];
  showStudentCombo = false;
  form: FormGroup;

  student: any;
  studentId: any;
  classid: any;
  att: any = [];
  cardHeight = 100;
  cardHeightExam =100;
  exams = [] ;
  assignments = [] ;
  projects = [] ;
  fees = [] ;
  tasks = [] ;
  showAttendance = true;
  dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  constructor( private attendacneService: AttendanceService, private router: Router,
    private route: ActivatedRoute, private location: Location,private datePipe: DatePipe,
    private masterService: MasterService, private taskService: TaskService, private fb: FormBuilder) {
   this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      myStudent: [''],
    });
  }

  ngOnInit() {

    this.masterService.getStudentsByUser(localStorage.getItem('userid'))
    .subscribe(
      (res) => {
        this.students = res;
        this.showAttendance = true;
        if (this.students.length > 0){
          this.student = this.students[0];
          this.studentId = this.student._id;
          this.classid = this.student.myClass;
          this.form.get('myStudent').setValue(this.student);
          if (this.students.length > 0) {
            if (this.students.length > 1) {
              this.showStudentCombo = true;
            }
            this.fetchData();
          }
        } else {
          this.showAttendance = false;
          this.fetchDataTeacher();
        }
      },
      err => console.log(err)
    );

  }
  fetchData() {
    const today = new Date();
    const yearInt = today.getFullYear();
    const monthInt = today.getMonth() + 1;
    const dayInt = today.getDate();
    console.log(yearInt + '/' + monthInt + '/' + dayInt);
    const param = `${yearInt}|${monthInt}|${this.studentId}|${this.classid}|Alert`;
    // // console.log(param);
    this.attendacneService.getAttendanceByStudentForMonth(param)
    .subscribe((res) => {
      this.att = res;
      this.att.reverse();
      this.fetchDataRest();
      // // console.log(this.attForMonth);
      // this.openDialog(this.attForMonth);
    });
  }
  fetchDataRest() {
    this.cardHeight = (this.showAttendance ? 4 : 3) * 32 + 3 * 20 + this.att.length * 20;
    const today = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    this.taskService.getTaskByStudentAlert(`${today}|${this.studentId}|${localStorage.getItem('schoolid')}|false`)
    .subscribe((res) => {
      this.tasks = res;
      console.log(this.tasks);
      this.assignments = this.tasks.filter(x => x.task.type === 'ASGT');
      this.exams = this.tasks.filter(x => x.task.type === 'EXAM');
      this.fees = this.tasks.filter(x => x.task.type === 'FEE');
      this.projects = this.tasks.filter(x => x.task.type === 'PRJ');
      // // console.log(this.attForMonth);
      // this.openDialog(this.attForMonth);
    });

  }
  fetchDataTeacher() {
    this.cardHeight = (this.showAttendance ? 4 : 3) * 32 + 3 * 20 + this.att.length * 20;
    const today = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    this.taskService.getTaskByTeacherAlert(`${today}|${localStorage.getItem('userid')}|${localStorage.getItem('schoolid')}|false`)
    .subscribe((res) => {
      this.tasks = res;
      console.log(this.tasks);
      this.assignments = this.tasks.filter(x => x.type._id === 'ASGT');
      this.exams = this.tasks.filter(x => x.type._id === 'EXAM');
      this.fees = this.tasks.filter(x => x.type._id === 'FEE');
      this.projects = this.tasks.filter(x => x.type._id === 'PRJ');
      // // console.log(this.attForMonth);
      // this.openDialog(this.attForMonth);
    });

  }
  changedStudent(e) {
    this.student = e.value;
    this.studentId = this.student._id;
    this.classid = this.student.myClass;
    // this.form.get('myStudent').setValue(this.student._id);
    this.fetchData();
  }
}
