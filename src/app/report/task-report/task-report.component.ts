import { MasterService } from './../../masterservices/master.service';
import { TaskService } from './../../transervice/task.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Location, DatePipe } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-task-report',
  templateUrl: './task-report.component.html',
  styleUrls: ['./task-report.component.css']
})
export class TaskReportComponent implements OnInit {

  displayedColumns: string[] = [ 'type', 'name', 'start', 'end', 'finished',
              'finishedon',  'grade' ];
  dataSource: any;
  tableData = [];
  form: FormGroup;
  classes: any;
  students = [];
  student: any;
  studentId: any;
  showStudentCombo = false;

  constructor( private router: Router,
    private route: ActivatedRoute, private location: Location,
     private taskService: TaskService, private fb: FormBuilder,
     private masterService: MasterService, private datePipe: DatePipe) {
   this.createForm();
  }

  ngOnInit() {
    this.masterService.getStudentsByUser(localStorage.getItem('userid'))
    .subscribe(
      (res) => {
        this.students = res;
        if (this.students.length > 0) {
          this.student = this.students[0];
          this.studentId = this.student._id;
          // this.classid = this.student.myClass;
          this.form.get('myStudent').setValue(this.student);
          if (this.students.length > 1) {
            this.showStudentCombo = true;
          }
          this.fetchData();
        }
      },
      err => console.log(err)
    );
  }
  createForm() {
    this.form = this.fb.group({
      myStudent: [''],
    });
  }
  public fetchData(): void {
    const today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.taskService.getTaskByStudentAlert(`${today}|${this.studentId}|${localStorage.getItem('schoolid')}|Nill`)
    .subscribe(
      (res) => {
        // console.log(res);
        this.tableData = res;
        this.dataSource = new MatTableDataSource(this.tableData);
        console.log(this.tableData);
      },
      err => console.log(err)
      );

  }
  changedStudent(e) {
    this.student = e.value;
    this.studentId = this.student._id;
    // this.classid = this.student.myClass;
    // this.form.get('myStudent').setValue(this.student._id);
    this.fetchData();
  }
}

