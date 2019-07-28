
import { MasterService } from './../../masterservices/master.service';
import { AttendanceService } from './../../transervice/attendance.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Location } from '@angular/common';
import * as myGlobals from '../../global';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AttendanceSummaryComponent } from '../attendance-summary/attendance-summary.component';
import { FormGroup, FormBuilder } from '@angular/forms';

export interface AttData {
  YearInt: string;
  MonthInt: number;
  Month: string;
  Total: number;
  Present: number;
  Absent: number;
}

@Component({
  selector: 'app-attendance-progress',
  templateUrl: './attendance-progress.component.html',
  styleUrls: ['./attendance-progress.component.css']
})
export class AttendanceProgressComponent implements OnInit {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
  }
  };
  displayedColumns: string[] = [ 'Month', 'Total', 'Present', 'Absent'];
  dataSource: MatTableDataSource<AttData>;
  tableData = [];

  public barChartLabels = ['Jan', 'Feb', 'Mar'];

  public barChartType = 'bar';
  public barChartLegend = true;
  att = [];
  attForMonth = [];
  workingDays = [];
  academic = [];
  chartLabel = [];
  chartData = [];
  chartData1 = [];
  studentId = '';
  classid = '';
  _barChartData = [];
  student: any = {};
  public barChartData: any[] = [
    {data: [0, 0, 0], label: 'Total Days'},
    {data: [0, 0, 0], label: 'Total Present'}
  ];
  // public barChartLabels: Array<any> = this.chartLabel;
  // public barChartData: Array<any> = [
  //   {data: this.chartData1, label: 'total days'},
  //   {data: this.chartData, label: 'absents'},
  // ];
  userid: string;
  students: any = [];
  showStudentCombo = false;
  form: FormGroup;
  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  constructor(public dialog: MatDialog, private attendacneService: AttendanceService, private router: Router,
    private route: ActivatedRoute, private location: Location, private masterService: MasterService, private fb: FormBuilder) {
   this.createForm();
  }

  ngOnInit() {
    this.student = this.masterService.selectedStudent;
    this.userid = localStorage.getItem('userid');
    this.route.params.subscribe(params => {
      this.studentId = params.id;
      if (this.studentId === 'parent') {
        console.log(this.userid);
        this.masterService.getStudentsByUser(this.userid)
        .subscribe(
          (res) => {
            this.students = res;
            this.student = this.students[0];
            this.studentId = this.student._id;
            console.log(this.student);
            this.classid = this.student.myClass;
            this.form.get('myStudent').setValue(this.student);
            if (this.students.length > 0) {
              if (this.students.length > 1) {
                this.showStudentCombo = true;
              }
              this.fetchData();
            }
          },
          err => console.log(err)
        );
      } else {
        this.fetchData();
      }
    });
  }
  createForm() {
    this.form = this.fb.group({
      myStudent: [''],
    });
  }
  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }
  navigateBack() {
    this.location.back();
  }
  studentAttendance(e, item) {
    const param = `${item.YearInt}|${item.MonthInt}|${this.studentId}|${this.classid}|Report`;
     console.log(param);
    this.attendacneService.getAttendanceByStudentForMonth(param)
    .subscribe((res) => {
      this.attForMonth = res;
      // console.log(this.attForMonth);
      this.openDialog(this.attForMonth);
    });
  }
  openDialog(attData): void {
    const dialogRef = this.dialog.open(AttendanceSummaryComponent, {
      width: '250px',
      data: attData
    });
    dialogRef.afterClosed().subscribe(saveData => {

    });
  }
  changedStudent(e) {
    this.student = e.value;
    this.studentId = this.student._id;
    this.classid = this.student.myClass;
    // this.form.get('myStudent').setValue(this.student._id);
    this.fetchData();
  }
  public fetchData(): void {
    const gohead = localStorage.getItem('academicDateFrom') || '';
    // console.log(gohead);
    if (gohead === '') {
        this.masterService.setselectorMessage('Please select academic year');
        this.router.navigate([`/selector`]);
        return;
    }
    let param = `${localStorage.getItem('academicDateFrom')}|${localStorage.getItem('academicDateTo')}`;
    param = `${param}|${this.studentId}|${this.classid}|${localStorage.getItem('schoolid')}`;
    console.log('fetchData: ' + param);
    this.attendacneService.getAttendanceMonthlyByStudent(param)
    .subscribe((res) => {
        // console.log(res);
        this.att = res.att;
        this.academic = res.acadamic;
        this.workingDays = res.attTotal;
        console.log(this.att);
        // console.log(this.workingDays);
        this.tableData.length=0;
        if (this.workingDays.length > 0)
        {
          // console.log(this.att[0]._id.month);
          let counter = 0;
          this.barChartLabels.length = 0;
          let atten: AttData;
          let item ;
          this.workingDays.forEach(element => {
             item = this.att.find(
              x => x._id.month  === element._id.month &&  x._id.year  === element._id.year);
            if (item) {
              element.absentDays = myGlobals.Utils.round(item.totalAbsent, 2) ;
            } else {
              element.absentDays = 0;
            }
            this.chartLabel.push(this.monthNames[element._id.month - 1]);
            this.chartData.push(element.count - element.absentDays);
            this.chartData1.push(element.count);
            this.barChartLabels.push(this.monthNames[element._id.month - 1]);
            atten = {
              YearInt: element._id.year,
              MonthInt: element._id.month,
              Month: this.monthNames[element._id.month - 1],
              Total: element.count,
              Present: myGlobals.Utils.round(element.count - element.absentDays, 2),
              Absent: element.absentDays
            };
            this.tableData.push(atten);
            counter++;
          });
          // this.barChartLabels.reverse();
          // console.log(this.chartLabel);
          // console.log(this.chartData);
          // console.log(this.chartData1);
          // console.log('table');
          // console.log(this.tableData);
          this.dataSource = new MatTableDataSource(this.tableData);
          this._barChartData.push ({data: new Array(this.chartData.length), label: 'Total Days'});
          this._barChartData.push ({data: new Array(this.chartData.length), label: 'Total Present'});
          for (let j = 0; j < this.chartData.length; j++) {
            this._barChartData[0].data[j] = this.chartData1[j];
            this._barChartData[1].data[j] = this.chartData[j];
          }
          this.barChartData = this._barChartData;
          //  this.barChartLabels.length = 0;
          // this.barChartLabels = this.chartLabel;
          // console.log(this._barChartData);
          console.log(this.barChartData);
          console.log(this.barChartLabels);
        }
      },
        err => console.log(err)
    );
  }
}
