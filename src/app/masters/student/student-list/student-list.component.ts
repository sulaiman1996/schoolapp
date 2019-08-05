import { Component, OnInit } from '@angular/core';
import { MasterService } from './../../../masterservices/master.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSnackBar, MatMenuModule, MatFormFieldModule } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconRegistry} from '@angular/material';
import { DomSanitizer} from '@angular/platform-browser';
export interface StudentDetail {
  classNo: number;
  students: string;
  name: string;
  class: string;
  classid: string;
}

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  displayedColumns: string[] = [ 'classNo', 'name', 'class', 'menu'];
  selection = new SelectionModel<StudentDetail>(true, []);
  form: FormGroup;
  classes = [];
  subjects = [];
  students = [];
  userid: string;
  // dataSource: DataSource<any>;
  dataSource: MatTableDataSource<StudentDetail>;
  tableData = [];
  marks = [];
  exmas = [];
  // studentImport = [];
  // userImport = [];
  // csvContent: string;
  constructor(private masterService: MasterService,
    private fb: FormBuilder,
    private location: Location, private router: Router, iconRegistry: MatIconRegistry,
     sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
        'more_vert',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/more_vert.svg'));
      iconRegistry.addSvgIcon(
          'att-checkbox',
          sanitizer.bypassSecurityTrustResourceUrl('assets/icons/att-checkbox.svg'));
      iconRegistry.addSvgIcon(
        'progress-up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/progress-up.svg'));
      iconRegistry.addSvgIcon(
        'assessment',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/assessment.svg'));
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      myClass: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.userid = localStorage.getItem('userid');
    // localStorage.setItem('username', res.user['email']);
    this.masterService.getClasses()
    .subscribe(
      res => {
        this.classes = res;
        // console.log(this.classes);
        this.classes.push({_id: 'ALL', name: 'All', divisions: 'All', __v: 0});
        if (localStorage.getItem('studentclass')) {
          this.form.get('myClass').setValue(localStorage.getItem('studentclass'));
          this.go();
        }
      }
    );

  }

  classChanged(code) {
    // this.fillStudentData();
    // this.tableData.length = 0;
    // this.dataSource = new MatTableDataSource(this.tableData);
    localStorage.setItem('studentclass', code);
    this.go();
  }
  go(){
    this.fillStudentData();
  }
  fillStudentData() {
    // const param = `${this.form.get('myClass').value}|${this.form.get('mySubject').value}|${this.form.get('exams').value}`;
    this.masterService.getStudentByClass(this.form.get('myClass').value)
    .subscribe(
      (res) => {
        // console.log(res);
        this.students = res;
        // console.log(this.students[0]['name']);
        // tslint:disable-next-line:prefer-const
        let len = this.students.length;
        // console.log(len);
        let std: StudentDetail;
        this.tableData.length = 0;
        for (let i = 0; i < len; i++) {
          std = {
              students: this.students[i]['_id'],
              class: this.students[i]['myClass']['name'],
              classNo: this.students[i]['classNo'],
              name: this.students[i]['name'],
              classid: this.students[i]['myClass']['_id']
          };
          this.tableData.push(std);
          // console.log(this.students[i]['marks'][0].mark);
        }
        this.dataSource = new MatTableDataSource(this.tableData);
        // console.log(this.tableData);
      },
      err => console.log(err)
      );
  }
  onChangeCheckBox(event, index, item) {

  }
  onChangeMark(event, index, item) {
    // item = !item.attendance;
    // if (!item.attendance) {
    //   item.marks = 0;
    // }
    // console.log(index);
    // console.log(index);
  }
  navigateBack() {
    this.location.back();
  }
  editStudent(event, item) {
    this.router.navigate([`/students/${item.students}`]);
  }
  addStudent() {
    this.router.navigate([`/students/__new`]);
  }
  attendanceClick(event, item){
     console.log(item);
    this.masterService.insertStudent(item);
    const param = `${item.students}|${item.classid}` ;
    this.router.navigate([`/attendanceProgress/${param}`]);
  }
  markClick(event, item){
    // console.log(item.students);
    this.masterService.insertStudent(item);
    this.router.navigate([`/markProgress/${item.students}`]);
  }
  markSummaryClick(event, item) {
    // console.log(item.students);
    this.masterService.insertStudent(item);
    this.router.navigate([`/markProgressSummary/${item.students}`]);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
