import { Component, OnInit } from '@angular/core';
import { MasterService } from './../../../masterservices/master.service';
import { MatTableDataSource, MatSnackBar, MatMenuModule, MatFormFieldModule } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as myGlobals from '../../../global';
@Component({
  selector: 'app-school-exam',
  templateUrl: './school-exam.component.html',
  styleUrls: ['./school-exam.component.css']
})
export class SchoolExamComponent implements OnInit {

  displayedColumns: string[] = ['no', 'short', 'name', 'options'];
  form: FormGroup;
  dataSource: any;
  tableData = [];
  error = '';
  constructor(private masterService: MasterService, private location: Location,
     private router: Router, private datePipe: DatePipe, private snackBar: MatSnackBar) {

   }

  ngOnInit() {
    this.fillData();
  }
  fillData() {
    if (this.masterService.schoolData.exam) {
      let i = 0;
      this.tableData.length = 0;
      this.masterService.schoolData.exam.forEach(element => {
        this.tableData.push({no: ++i, short: element['short'], name: element['name']});
      });
      this.dataSource = new MatTableDataSource(this.tableData);
    } else {
      this.fillDefault();
    }
  }
  fillDefault() {
    this.tableData.length = 0;
    this.tableData.push({no: 1, short: 'UT-1', name: 'Unit Test 1'});
    this.tableData.push({no: 2, short: 'UT-2', name: 'Unit Test 2'});
    this.tableData.push({no: 3, short: 'UT-3', name: 'Unit Test 3'});
    this.tableData.push({no: 4, short: 'QTE', name: 'Quarterly'});
    this.tableData.push({no: 5, short: 'UT-4', name: 'Unit Test 4'});
    this.tableData.push({no: 6, short: 'UT-5', name: 'Unit Test 5'});
    this.tableData.push({no: 7, short: 'MDT', name: 'Mid Term'});
    this.tableData.push({no: 8, short: 'UT-6', name: 'Unit Test 6'});
    this.tableData.push({no: 9, short: 'MDL1', name: 'Model 1'});
    this.tableData.push({no: 10, short: 'MDL2', name: 'Model 2'});
    this.dataSource = new MatTableDataSource(this.tableData);
  }
  add() {
    this.tableData.push({no: (this.tableData.length + 1), short: '', name: ''});
    this.dataSource = new MatTableDataSource(this.tableData);
  }
  deleteMember(row){
    console.log(row);
    const index: number = this.tableData.indexOf(row);
    if (index !== -1) {
        this.tableData.splice(index, 1);
    }
    this.dataSource = new MatTableDataSource(this.tableData);
  }
  showMessage(msg){
    this.snackBar.open(msg, 'OK', {
      duration: 2000, panelClass: ['blue-snackbar']
    });
  }
  next() {
    if (this.masterService.schoolidRegistration.trim() === ''){
      this.showMessage('School code is empty!');
    }
    let blankEntry = false;
    const prd = [];
    this.tableData.forEach(element => {
      prd.push({short : element.short.toString().trim(), name: element.name.toString().trim(),
         schoolid: this.masterService.schoolidRegistration,
      orderby: element.no});
      for (const key in element) {
        if (element.hasOwnProperty(key)) {
          // console.log(key + ': ' + element[key]);
          if (element[key].toString().trim() === '') {
              blankEntry = true ;
          }
        }
      }
    });
    if (myGlobals.Utils.isDuplicate(prd, ['short'])) {
      console.log('Duplicate entry');
      this.showMessage('Duplicate entry!');
      return;
    }
    if (blankEntry) {
        console.log('Blank entry');
        this.showMessage('Blank entry!');
    } else {
      // console.log(this.masterService.schoolidRegistration);
      // console.log(this.masterService.schoolData);

      const date = new Date();
      const param = `${this.datePipe.transform(date, 'yyyy')}`;

      this.masterService.setSchoolDataMaster('exam', prd);
      const yyyy = new Date().getFullYear()  ;
      let yy = yyyy - 2000;
      const academicArray = [];
      for (let i = yyyy - 1; i < yyyy + 5; i++) {
        const academic = {};
        academic['active'] = true;
        academic['schoolid'] = this.masterService.schoolidRegistration;
        academic['name'] = `${i}-${yy++}`;
        academic['dateFrom'] = `${i}-06-01T00:00:00.000Z`;
        academic['dateTo'] = `${i + 1}-05-31T00:00:00.000Z`;
        academic['classUpto'] = `${i + 1}-03-31T00:00:00.000Z`;
        academicArray.push(academic);
      }
      console.log(academicArray);
      this.masterService.setSchoolDataMaster('academic', academicArray);
      console.log(this.masterService.schoolData.academic[0]);
      if (this.masterService.schoolData.academic
        && this.masterService.schoolData.school && this.masterService.schoolData.class
        && this.masterService.schoolData.division && this.masterService.schoolData.period
        && this.masterService.schoolData.user && this.masterService.schoolData.exam
        && this.masterService.schoolData.subject
        ) {
          this.masterService.schoolRegistration(this.masterService.schoolData)
          .subscribe(
            res => {
              console.log(res);
              this.router.navigate([`/school-finish`]);
            } ,
            err => console.log(err)
          );
      } else {
        this.showMessage('Some missing data!');
      }

    }
  }
}
