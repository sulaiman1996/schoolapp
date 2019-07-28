import { Component, OnInit } from '@angular/core';
import { MasterService } from './../../../masterservices/master.service';
import { MatTableDataSource, MatSnackBar, MatMenuModule, MatFormFieldModule } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import * as myGlobals from '../../../global';

@Component({
  selector: 'app-school-class',
  templateUrl: './school-class.component.html',
  styleUrls: ['./school-class.component.css']
})
export class SchoolClassComponent implements OnInit {

  displayedColumns: string[] = ['no', 'class', 'division', 'options'];
  form: FormGroup;
  dataSource: any;
  tableData = [];
  error = '';
  constructor(private masterService: MasterService, private location: Location,
     private snackBar: MatSnackBar, private router: Router) {
   }
  ngOnInit() {
    this.fillData();
  }
  fillDefault() {
    this.tableData.length = 0;
    this.tableData.push({no: 0, class: 'Pass out', division: 'PO'});
    this.tableData.push({no: 1, class: 'VIII', division: 'A'});
    this.tableData.push({no: 2, class: 'VIII', division: 'B'});
    this.tableData.push({no: 3, class: 'VIII', division: 'C'});
    this.tableData.push({no: 4, class: 'IX', division: 'A'});
    this.tableData.push({no: 5, class: 'IX', division: 'B'});
    this.tableData.push({no: 6, class: 'IX', division: 'C'});
    this.tableData.push({no: 7, class: 'X', division: 'A'});
    this.tableData.push({no: 8, class: 'X', division: 'B'});
    this.tableData.push({no: 9, class: 'X', division: 'C'});
    this.tableData.push({no: 10, class: 'XI', division: 'Science 1'});
    this.tableData.push({no: 11, class: 'XI', division: 'Science 2'});
    this.tableData.push({no: 12, class: 'XI', division: 'Com'});
    this.tableData.push({no: 13, class: 'XI', division: 'Humanities'});
    this.tableData.push({no: 14, class: 'XII', division: 'Science 1'});
    this.tableData.push({no: 15, class: 'XII', division: 'Science 2'});
    this.tableData.push({no: 16, class: 'XII', division: 'Com'});
    this.tableData.push({no: 17, class: 'XII', division: 'Humanities'});
    this.dataSource = new MatTableDataSource(this.tableData);
  }
  fillData() {
    // console.log(this.masterService.schoolData.class);
    if (this.masterService.schoolData.class) {
      let i = 0;
      this.tableData.length = 0;
      this.masterService.schoolData.class.forEach(element => {
        this.tableData.push({no: ++i, class: element['name'], division: element['division']});
      });
      this.dataSource = new MatTableDataSource(this.tableData);
    } else {
      this.fillDefault();
    }
  }
  add() {
    this.tableData.push({no: (this.tableData.length + 1).toString(), class: '', division: ''});
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
  next() {
    let blankEntry = false;
    const div = [];
    const classArr = [];
    this.tableData.forEach(element => {
      classArr.push({name : element.class.toString().trim(), division: element.division.toString().trim(),
          schoolid: this.masterService.schoolidRegistration});
      for (const key in element) {
        if (element.hasOwnProperty(key)) {
          // console.log(key + ': ' + element[key]);
          if (key === 'division') {
            div.push( element[key].toString().trim());
          }
          if (element[key].toString().trim() === '') {
              blankEntry = true ;
          }
        }
      }
    });

    if (blankEntry) {
      console.log('Blank entry');
      this.showMessage('Blank entry');
      return;
    }
    if (myGlobals.Utils.isDuplicate(classArr, ['name', 'division'])) {
      console.log('Duplicate entry');
      this.showMessage('Duplicate entry');
      return;
    }

    const uniqueDiv = div.filter(this.onlyUnique);
    // console.log(this.masterService.schoolidRegistration);
    console.log(this.masterService.schoolData);
    const divisions = [];
    uniqueDiv.forEach(e => {
      divisions.push({name: e, schoolid: this.masterService.schoolidRegistration});
    });
    this.masterService.setSchoolDataMaster('division', divisions);
    this.masterService.setSchoolDataMaster('class', classArr);
    this.router.navigate([`/school-period`]);
    console.log(divisions);

  }
  showMessage(msg){
    this.snackBar.open(msg, 'OK', {
      duration: 2000, panelClass: ['blue-snackbar']
    });
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
}
