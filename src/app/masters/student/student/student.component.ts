import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MasterService } from './../../../masterservices/master.service';
import { animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StudentComponent implements OnInit, AfterViewInit {
  //  students: PeriodicElement[] = [];
   students = [];
  displayedColumns = ['classNo', 'name', 'admNo'];
  headerColumns = ['Class No', 'Name', 'Adm.No'];
  expandedElement: PeriodicElement;
  constructor(private masterService: MasterService) { 

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<PeriodicElement>;

  ngOnInit() {
    this.fetchStudents();
    console.log(this.students);
    this.dataSource = new MatTableDataSource(this.students);
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  fetchStudents() {
    this.masterService.getStudents()
    .subscribe(
      res => this.students = res,
      err => console.log(err)
    );
  }
}
export interface PeriodicElement {
    _id : String;
    name :String;
    myClass : String;
    classNo : 1;
    dateOfJoin : Date;
    dob : Date;
    admNo : String;
    myRelegion : String;
    myCaste : String;
    __v : Number
}