import { Component, OnInit } from '@angular/core';
import { MasterService } from './../../../masterservices/master.service';
import { MatTableDataSource, MatSnackBar, MatMenuModule, MatFormFieldModule } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import * as myGlobals from '../../../global';

@Component({
  selector: 'app-school-subject',
  templateUrl: './school-subject.component.html',
  styleUrls: ['./school-subject.component.css']
})
export class SchoolSubjectComponent implements OnInit {

  displayedColumns: string[] = ['no', 'short', 'name', 'options'];
  form: FormGroup;
  dataSource: any;
  tableData = [];
  error = '';
  constructor(private masterService: MasterService, private location: Location,
     private router: Router, private snackBar: MatSnackBar) {

   }

  ngOnInit() {
    this.fillData();
  }
  fillDefault() {
    this.tableData.length = 0;
    this.tableData.push({no: 1, short: 'MAL', name: 'Malayalam'});
    this.tableData.push({no: 2, short: 'HND', name: 'Hindi'});
    this.tableData.push({no: 3, short: 'SKT', name: 'Sanskrit'});
    this.tableData.push({no: 4, short: 'ARB', name: 'Arabic'});
    this.tableData.push({no: 5, short: 'ENG', name: 'English'});
    this.tableData.push({no: 6, short: 'URD', name: 'Urdu'});
    this.tableData.push({no: 7, short: 'PHY', name: 'Physics'});
    this.tableData.push({no: 8, short: 'CHE', name: 'Chemistry'});
    this.tableData.push({no: 9, short: 'MATH', name: 'Mathematics'});
    this.tableData.push({no: 10, short: 'BIO', name: 'Biology'});
    this.tableData.push({no: 11, short: 'COM', name: 'Commerce'});
    this.tableData.push({no: 12, short: 'SSC', name: 'Social Science'});
    this.tableData.push({no: 13, short: 'CS', name: 'Computer Science'});
    this.tableData.push({no: 14, short: 'BS', name: 'Business Studies'});
    this.tableData.push({no: 15, short: 'ABK', name: 'Accounts & Book Keeping'});
    this.tableData.push({no: 16, short: 'ECO', name: 'Economics'});
    this.tableData.push({no: 17, short: 'IT', name: 'IT'});

    this.dataSource = new MatTableDataSource(this.tableData);
  }
  fillData() {
    if (this.masterService.schoolData.subject) {
      let i = 0;
      this.tableData.length = 0;
      this.masterService.schoolData.subject.forEach(element => {
        this.tableData.push({no: ++i, short: element['short'], name: element['name']});
      });
      this.dataSource = new MatTableDataSource(this.tableData);
    } else {
      this.fillDefault();
    }
  }
  add() {
    this.tableData.push({no: (this.tableData.length + 1).toString(), name: '', short: ''});
    this.dataSource = new MatTableDataSource(this.tableData);
  }
  deleteMember(row) {
    console.log(row);
    const index: number = this.tableData.indexOf(row);
    if (index !== -1) {
        this.tableData.splice(index, 1);
    }
    this.dataSource = new MatTableDataSource(this.tableData);
  }
  showMessage(msg){
    this.snackBar.open(msg, 'OK', {
      duration: 2000
    });
  }
  next() {
    let blankEntry = false;
    const clss = [];
    this.tableData.forEach(element => {
      clss.push({short : element.short.toString().trim(),
        name: element.name.toString().trim(),  schoolid: this.masterService.schoolidRegistration});
      for (const key in element) {
        if (element.hasOwnProperty(key)) {
          // console.log(key + ': ' + element[key]);
          if (element[key].toString().trim() === '') {
              console.log(element);
              blankEntry = true ;
          }
        }
      }
    });
    if (myGlobals.Utils.isDuplicate(clss, ['short'])) {
      console.log('Duplicate entry');
      this.showMessage('Duplicate entry');
      return;
    }
    if (blankEntry) {
        console.log('Blank entry');
        this.showMessage('Blank entry');
    } else {
      console.log(this.masterService.schoolidRegistration);
      console.log(this.masterService.schoolData);
      this.masterService.setSchoolDataMaster('subject', clss);
      this.router.navigate([`/school-exam`]);
    }
  }
}
