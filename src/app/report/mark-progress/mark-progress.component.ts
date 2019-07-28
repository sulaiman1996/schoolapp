import { MarksentryService } from './../../transervice/marksentry.service';
import { Component, OnInit } from '@angular/core';
import { MasterService } from './../../masterservices/master.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as myGlobals from '../../global';
import { MatTableDataSource } from '@angular/material';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-mark-progress',
  templateUrl: './mark-progress.component.html',
  styleUrls: ['./mark-progress.component.css']
})
export class MarkProgressComponent implements OnInit {
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
  public barChartType = 'bar';
  public barChartLegend = true;
  studentId = '';
  student: any = {} ;
  marks = [];
  tableData = [];
  chartDataPer = [];
  chartData = [];
  displayedColumns = [];
  dataSource: any;
  largeCol = true;
  _barChartData = [];
  barChartCaptions = [] ;
  public barChartData: any[] = [];
  public barChartLabels: any[] = [];
  userid: string;
  students: any = [];
  showStudentCombo = false;
  form: FormGroup;
  colors = [
    { // 1st Year.
      backgroundColor: 'rgba(0,0,255,0.7)'
    },
    { // 2nd Year.
      backgroundColor: 'rgba(0,255,0, 0.8)'
    }
  ]
  constructor(private marksentryService: MarksentryService, private masterService: MasterService
    , private route: ActivatedRoute, private router: Router, private location: Location, private fb: FormBuilder) {
      this.createForm();
    }
    createForm() {
      this.form = this.fb.group({
        myStudent: [''],
      });
    }
    ngOnInit() {
      this.student = this.masterService.selectedStudent;
      this.userid = localStorage.getItem('userid');
      this.route.params.subscribe(params => {
        // const param = params.id.split('|');
        this.studentId = params.id;
        if (this.studentId === 'parent') {
          this.masterService.getStudentsByUser(this.userid)
          .subscribe(
            (res) => {
              this.students = res;
              this.student = this.students[0];
              this.studentId = this.student._id;
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
  fetchData() {
    const acyear = localStorage.getItem('academic') || '';
    //  console.log('fetchdata:' +  acyear);
    if (acyear === '') {
        this.masterService.setselectorMessage('Please select academic year');
        this.router.navigate([`/selector`]);
        return;
    }
    const param = `${this.studentId}|${acyear}`;
    // console.log(param);
    this.marksentryService.getMarksByAcademicYearOfStudent(param)
      .subscribe((res) => {
        this.marks = res;
        console.log(res);
        let obj = {};
        let objChartPer = {};
        let objChart = {};
        let objChartMark = {};
        let cols = {};
        let sub = '';
        let pushed = false;
        this.barChartLabels.length = 0;
        this.barChartCaptions.length = 0;
        this.barChartData.length = 0;
        this.chartData.length = 0;
        this.chartDataPer.length = 0;
        this.tableData.length = 0;
        let mmark = '';
        // tslint:disable-next-line:forin
        for (let i in this.marks ) {
          if (sub !== this.marks[i]['subj'].short){
            if (sub !== '') {
              this.tableData.push(obj);
              this.chartDataPer.push(objChartPer);
              this.chartData.push(objChart);
              pushed = true;
              obj = {};
              objChartPer = {};
              objChart = {};
            }
            sub = this.marks[i]['subj'].short;
            obj['Sub'] = sub;
            objChartPer['Sub'] = sub;
            objChart['Sub'] = this.marks[i]['subj'].name;;
          }
          mmark = this.marks[i].attendance ? `/${this.marks[i].maxMark}` : '';
          obj[this.marks[i]['exam'].name] = `${(this.marks[i].attendance ? this.marks[i].mark : 'A')}${mmark}`;
          objChartPer[this.marks[i].exams] = myGlobals.Utils.round(this.marks[i].mark * 100 / this.marks[i].maxMark, 2);
          objChartMark['Mark'] = this.marks[i].mark;
          objChartMark['Max'] = this.marks[i].maxMark;
          objChart[this.marks[i]['exam'].name] = objChartMark;
          objChartMark = {};
          // obj[this.marks[i].exams + '.Max'] = this.marks[i].maxMark;
          pushed = false;
          const lZero = this.marks[i]['exam'].orderby < 10 ? '0' : '';
          cols[`${lZero}${this.marks[i]['exam'].orderby}${this.marks[i]['exam'].name}`] = this.marks[i]['exam'].orderby;
        }
        if (!pushed) {
          this.tableData.push(obj);
          this.chartDataPer.push(objChartPer);
          this.chartData.push(objChart);
        }
        this.dataSource = new MatTableDataSource(this.tableData);
        // console.log(this.tableData);
        // console.log(this.chartDataPer);
        // console.log(this.chartData);
        cols['00Sub'] = 0;
        // console.log(cols);
        // tslint:disable-next-line:forin
        for (const key in cols) {
          // console.log(' name=' + key + ' value=' + cols[key]);
          this.displayedColumns.push(key);
        }
         // this._barChartData.push ({data: new Array(fieldLenth), label: 'max'});
         // this._barChartData.push ({data: new Array(fieldLenth), label: 'mark'});
        let i = 0;
        for (let n = 0; n < this.chartData.length; n++) {
          i = 0;
          const dt = [];
          const dtMax = [];
          const labelData = [];
          const bData = [];
          for (const k in this.chartData[n]) {
            if (k !== 'Sub') {
              labelData.push(k);
              // tslint:disable-next-line:forin
              for (const j in this.chartData[n][k]) {
                // console.log(i + ' name=' + j + ' value=' + this.chartData[n][k][j]);
                if (j === 'Max') {
                  dtMax.push(this.chartData[n][k][j]);
                } else {
                  dt.push(this.chartData[n][k][j]);
                }
              }
              i++;
            } else {
              this.barChartCaptions.push(this.chartData[n][k]);
            }
          }
          bData.push ({data: dtMax, label: 'max', fillColor: 'rgba(151,187,205,0.5)',
           strokeColor: 'rgba(151,187,205,0.8)', highlightFill: 'rgba(151,187,205,0.75)',
           highlightStroke: 'rgba(151,187,205,1)'});
          bData.push ({data: dt, label: 'mark'});
          this.barChartData.push(bData);
          this.barChartLabels.push(labelData);
        }
        // console.log(this.barChartData);
        this.displayedColumns.sort();
        // tslint:disable-next-line:forin
        for (const j in this.displayedColumns ) {
          this.displayedColumns[j] = this.displayedColumns[j].slice(2, this.displayedColumns[j].length);
        }
        this.largeCol = this.displayedColumns.length > 9 ;
      //  console.log(this.displayedColumns);
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
  changedStudent(e) {
    this.student = e.value;
    this.studentId = this.student._id;
    // this.form.get('myStudent').setValue(this.student._id);
    this.fetchData();
  }
}
