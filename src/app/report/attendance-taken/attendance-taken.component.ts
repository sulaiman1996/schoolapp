import { MasterService } from './../../masterservices/master.service';
import { AttendanceService } from './../../transervice/attendance.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
export interface AttendanceData {
  No: number;
  Name: string;
  Periods: string;
  Subjects: string;
}
@Component({
  selector: 'app-attendance-taken',
  templateUrl: './attendance-taken.component.html',
  styleUrls: ['./attendance-taken.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})

export class AttendanceTakenComponent implements OnInit {
  form: FormGroup;
  data = [];
  classes = [];
  tableData = [];
  headerData = [];
  showtable = false;
  displayedColumns: string[] = [ 'No', 'Name', 'Periods', 'Subjects'];
  dataSource: MatTableDataSource<AttendanceData>;
  message = '';
  constructor(private attendacneService: AttendanceService, private router: Router,
    private route: ActivatedRoute, private location: Location, private masterService: MasterService, private fb: FormBuilder
    , private datePipe: DatePipe) {
   this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      myClass: ['', Validators.required],
      dates: ['', Validators.required]
    });
  }
  ngOnInit() {
    const currentDate = new Date();
    this.form.get('dates').setValue (currentDate);
    this.masterService.getClasses()
    .subscribe(
      (res) => {
         this.classes = res;
      },
      err => console.log(err)
    );
  }
  studentAttendance() {
    const date = new Date(this.form.get('dates').value);
    const param = `${this.datePipe.transform(date, 'yyyy-MM-dd')}|${this.form.get('myClass').value}`;
    this.message = '';
    // console.log(param);
    this.tableData.length = 0;
    this.attendacneService.getAttendanceTakenByClass(param)
    .subscribe((res) => {
      this.data = res.attendance;
      this.headerData = res.header;
      if (this.headerData.length === 0) {
        this.message = 'No attendance entered for the day: ' + this.datePipe.transform(date, 'dd-MM-yyyy');
        this.showtable = false;
      } else {
        this.showtable = true;
      }
       console.log(this.data);
       let atten: AttendanceData;
       let prds = '';
       let subs = '';
       this.data.forEach(element => {
          // prds = '';
          // element.period.forEach(e => {
          //   prds = prds + e.name + ',';
          // });
          // subs = '';
          // element.subject.forEach(e => {
          //   subs = subs + e.short + ',';
          // });
          atten = {
            No: element._id.classNo,
            Name: element._id.name,
            Periods: element.periods,
            Subjects: element.subjects,
          };
          this.tableData.push(atten);
        });
      this.dataSource = new MatTableDataSource(this.tableData);
    });
  }
}
