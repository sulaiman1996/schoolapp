import { Component, OnInit } from '@angular/core';
import { MasterService } from './../../masterservices/master.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
// import { DataSource } from '@angular/cdk/collections';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';

export interface StudentCount {
  Gender: string;
  General: number;
  SC: number;
  ST: number;
  Total: number;
}
@Component({
  selector: 'app-student-category',
  templateUrl: './student-category.component.html',
  styleUrls: ['./student-category.component.css']
})
export class StudentCategoryComponent implements OnInit {
  displayedColumns: string[] = [ 'Gender', 'General', 'SC', 'ST', 'Total' ];
  dataSource: MatTableDataSource<StudentCount>;
  tableData = [];
  form: FormGroup;
  classes: any;
  students: any;
  public doughnutChartLabels:string[] = ['Total Boys', 'Total Girls'];
  public doughnutChartData:number[] = [0, 0];
  public doughnutChartType:string = 'doughnut';
  constructor( private router: Router,
    private route: ActivatedRoute, private location: Location, private masterService: MasterService, private fb: FormBuilder) {
   this.createForm();
  }

  ngOnInit() {
    // this.userid = localStorage.getItem('userid');
    // localStorage.setItem('username', res.user['email']);
    this.masterService.getClasses()
    .subscribe(
      res => {
        this.classes = res;
        // console.log(this.classes);
        this.classes.push({_id: 'ALL', name: 'All', divisions: 'All', __v: 0});
        // console.log( this.classes[this.classes.length - 1])
        this.form.get('myClass').setValue(this.classes[this.classes.length - 1]._id);
        this.fetchData();
      }
    );
  }
  createForm() {
    this.form = this.fb.group({
      myClass: [''],
    });
  }
  public fetchData(): void {
    this.masterService.getstudentsCountByClass(this.form.get('myClass').value)
    .subscribe(
      (res) => {
        // console.log(res);
        this.students = res;
        let len = this.students.length;
        // console.log(len);
        let std: StudentCount;
        let netTotal = 0;
        let netGen = 0;
        let netSC = 0;
        let netST = 0;
        let chartData = [];
        this.tableData.length = 0;
        let filteredG = this.students.filter(f => f.gender === 'Male' && f.category === 'General');
        let filteredSC = this.students.filter(f => f.gender === 'Male' && f.category === 'SC');
        let filteredST = this.students.filter(f => f.gender === 'Male' && f.category === 'ST');
        let total = ((filteredG.length > 0) ? filteredG[0]['count'] : 0) + ((filteredSC.length > 0) ? filteredSC[0]['count'] : 0) +
            ((filteredST.length > 0) ? filteredST[0]['count'] : 0);
        netTotal = netTotal + total;
        netGen = netGen + ((filteredG.length > 0) ? filteredG[0]['count'] : 0);
        netST = netST + ((filteredST.length > 0) ? filteredST[0]['count'] : 0);
        netSC = netSC + ((filteredSC.length > 0) ? filteredSC[0]['count'] : 0);
        std = {
          Gender: 'Male',
          General: (filteredG.length > 0) ? filteredG[0]['count'] : null,
          SC: (filteredSC.length > 0) ? filteredSC[0]['count'] : null,
          ST: (filteredST.length > 0) ? filteredST[0]['count'] : null,
          Total: total,
        };
        this.tableData.push(std);
        filteredG = this.students.filter(f => f.gender === 'Female' && f.category === 'General');
        filteredSC = this.students.filter(f => f.gender === 'Female' && f.category === 'SC');
        filteredST = this.students.filter(f => f.gender === 'Female' && f.category === 'ST');
        total = ((filteredG.length > 0) ? filteredG[0]['count'] : 0) + ((filteredSC.length > 0) ? filteredSC[0]['count'] : 0) +
            ((filteredST.length > 0) ? filteredST[0]['count'] : 0);
        netTotal = netTotal + total;
        netGen = netGen + ((filteredG.length > 0) ? filteredG[0]['count'] : 0);
        netST = netST + ((filteredST.length > 0) ? filteredST[0]['count'] : 0);
        netSC = netSC + ((filteredSC.length > 0) ? filteredSC[0]['count'] : 0);
        std = {
          Gender: 'Female',
          General: (filteredG.length > 0) ? filteredG[0]['count'] : null,
          SC: (filteredSC.length > 0) ? filteredSC[0]['count'] : null,
          ST: (filteredST.length > 0) ? filteredST[0]['count'] : null,
          Total: total,
        };
        this.tableData.push(std);
        std = {
          Gender: 'Total',
          General: netGen,
          SC: netSC > 0 ?  netSC : null,
          ST:  netST > 0 ?  netST : null,
          Total: netTotal,
        };
        chartData.push(this.tableData[0].Total);
        chartData.push(this.tableData[1].Total);
        this.doughnutChartData = chartData;
        this.tableData.push(std);
        this.dataSource = new MatTableDataSource(this.tableData);
        //  console.log(this.tableData);
      },
      err => console.log(err)
      );

  }
  classChanged(code) {
    // this.fillStudentData();
    // this.tableData.length = 0;
    // this.dataSource = new MatTableDataSource(this.tableData);
    // localStorage.setItem('studentclass', code);
    // var result = document.getElementById('testinput');
    // var target = document.element(document.getElementById('testinput')).val();

    this.fetchData();
  }
}
