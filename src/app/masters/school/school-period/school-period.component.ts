import { Component, OnInit } from '@angular/core';
import { MasterService } from './../../../masterservices/master.service';
import { MatTableDataSource, MatSnackBar, MatMenuModule, MatFormFieldModule } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import * as myGlobals from '../../../global';
@Component({
  selector: 'app-school-period',
  templateUrl: './school-period.component.html',
  styleUrls: ['./school-period.component.css']
})
export class SchoolPeriodComponent implements OnInit {

  displayedColumns: string[] = ['no', 'name', 'from', 'to', 'options'];
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
    this.tableData.push({no: 1, name: 'I', from: '9.00', to: '9.45'});
    this.tableData.push({no: 2, name: 'II', from: '9.45', to: '10.25'});
    this.tableData.push({no: 3, name: 'III', from: '10.25', to: '11.05'});
    this.tableData.push({no: 4, name: 'IV', from: '11.10', to: '11.50'});
    this.tableData.push({no: 5, name: 'V', from: '11.50', to: '12.30'});
    this.tableData.push({no: 6, name: 'VI', from: '1.05', to: '1.45'});
    this.tableData.push({no: 7, name: 'VII', from: '1.45', to: '2.25'});
    this.tableData.push({no: 8, name: 'VIII', from: '2.25', to: '3.05'});
    this.tableData.push({no: 9, name: 'IX', from: '3.10', to: '3.45'});
    this.tableData.push({no: 10, name: 'X', from: '3.45', to: '4.30'});
    this.dataSource = new MatTableDataSource(this.tableData);
  }
  fillData() {
    if (this.masterService.schoolData.period) {
      let i = 0;
      this.tableData.length = 0;
      this.masterService.schoolData.period.forEach(element => {
        const tt = element['times'].split('-');
        this.tableData.push({no: ++i,  name: element['name'], from: tt[0], to: tt[1]});
      });
      this.dataSource = new MatTableDataSource(this.tableData);
    } else {
      this.fillDefault();
    }
  }
  add() {
    this.tableData.push({no: (this.tableData.length + 1).toString(), name: '', from: '', to: ''});
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
    const prd = [];
    this.tableData.forEach(element => {
      prd.push({name: element.name.toString().trim(),
        times : `${element.from.toString().trim()}-${element.to.toString().trim()}`,
        schoolid: this.masterService.schoolidRegistration});
      for (const key in element) {
        if (element.hasOwnProperty(key)) {
          // console.log(key + ': ' + element[key]);
          if (element[key].toString().trim() === '') {
              blankEntry = true ;
          }
        }
      }
    });
    if (myGlobals.Utils.isDuplicate(prd, ['name'])) {
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
      this.masterService.setSchoolDataMaster('period', prd);
      this.router.navigate([`/school-subject`]);
    }
  }
}
