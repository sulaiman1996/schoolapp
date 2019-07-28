import { MarksentryService } from './../../transervice/marksentry.service';
import { Component, OnInit } from '@angular/core';
import { MasterService } from './../../masterservices/master.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as myGlobals from '../../global';
import { MatTableDataSource } from '@angular/material';
import { Location } from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-mark-progress1',
  templateUrl: './mark-progress1.component.html',
  styleUrls: ['./mark-progress1.component.css']
})
export class MarkProgress1Component implements OnInit {
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

  public barChartData: any[] = [];
  public barChartLabels: any[] = [];

  colors = [
    { backgroundColor: 'rgba(0,0,255,0.7)'},
    { backgroundColor: 'rgba(0,255,0, 0.8)'},
    { backgroundColor: 'rgba(255,0,0, 0.8)'},
    { backgroundColor: 'rgba(155,50,0, 0.8)'},
    { backgroundColor: 'rgba(155,0,155, 0.8)'},
    { backgroundColor: 'rgba(255,155,0, 0.8)'}
  ];
  userid: string;
  students: any = [];
  showStudentCombo = false;
  form: FormGroup;
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
    // console.log(gohead);
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
        this.tableData.length = 0;
        this.barChartData.length =0 ;
        this.barChartLabels.length =0;
        this.displayedColumns.length = 0;
        this.chartDataPer.length =0;
        this.chartData.length =0;
        console.log(res);
        let obj = {};
        let objChartPer = {};
        let objChart = {};
        let objChartMark = {};
        let cols = {};
        let sub = '';
        let pushed = false;
        let mmark = '';
        this.barChartLabels.length = 0;
        // tslint:disable-next-line:forin
        for (const i in this.marks ) {
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
            objChartPer['Sub'] = this.marks[i]['subj'].name;
            objChart['Sub'] = this.marks[i]['subj'].name;
          }
          mmark = this.marks[i].attendance ? `/${this.marks[i].maxMark}` : '';
          obj[this.marks[i]['exam'].name] = `${(this.marks[i].attendance ? this.marks[i].mark : 'A')}${mmark}`;
          // obj[this.marks[i]['exam'].name] = `${this.marks[i].mark}/${this.marks[i].maxMark}`;
          objChartPer[this.marks[i]['exam'].name] = myGlobals.Utils.round(this.marks[i].mark * 100 / this.marks[i].maxMark, 2);
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
        console.log(this.chartDataPer);
        // tslint:disable-next-line:forin
        cols['00Sub'] = 0;
        // console.log(cols);
        // tslint:disable-next-line:forin
        for (const key in cols) {
          // console.log(' name=' + key + ' value=' + cols[key]);
          this.displayedColumns.push(key);
        }
        this.displayedColumns.sort();
        const labelData = [];
        // tslint:disable-next-line:forin
        for (const j in this.displayedColumns ) {
          this.displayedColumns[j] = this.displayedColumns[j].slice(2, this.displayedColumns[j].length);
          if (this.displayedColumns[j] !== 'Sub') {labelData.push(this.displayedColumns[j]); }
        }
        let i = 0;
        const bData = [];
        let labl = '';
        for (let n = 0; n < this.chartDataPer.length; n++) {
          const dt = [];
          labl = this.chartDataPer[n]['Sub'];
          for (let k = 0; k < labelData.length; k++) {
            // labelData[k] in this.chartDataPer[n] ? console.log('key exists') : console.log('unknown key');
              if (labelData[k] in this.chartDataPer[n]) {
                dt.push(this.chartDataPer[n][labelData[k]]);
              } else {
                dt.push(0);
              }
          }
          bData.push ({data: dt, label: labl});
        }
        this.barChartData.push(bData);
        console.log(this.barChartData);

        this.barChartLabels.push(labelData);
        this.largeCol = this.displayedColumns.length > 9 ;
        console.log(this.barChartLabels);
      });
  }
  navigateBack() {
    this.location.back();
  }
  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }
  onValChange(val: string) {
    this.barChartType = val;
  }
  changedStudent(e) {
    this.student = e.value;
    this.studentId = this.student._id;
    // this.form.get('myStudent').setValue(this.student._id);
    this.fetchData();
  }
}
