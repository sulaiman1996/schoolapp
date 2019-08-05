import { Component, OnInit } from '@angular/core';
import { MasterService } from './../../../masterservices/master.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSnackBar, MatMenuModule, MatFormFieldModule } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconRegistry} from '@angular/material';
import { DomSanitizer} from '@angular/platform-browser';
export interface TeacherDetail {
  PEN: number;
  teacher: string;
  name: string;
  section: string;
}
@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {
  displayedColumns: string[] = [ 'PEN', 'name', 'section', 'menu'];
  selection = new SelectionModel<TeacherDetail>(true, []);
  form: FormGroup;
  sections = [];
  teachers = [];
  dataSource: MatTableDataSource<TeacherDetail>;
  tableData = [];
  userid: string;
  constructor(private masterService: MasterService, private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private location: Location, private router: Router, iconRegistry: MatIconRegistry,
     sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
        'more_vert',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/more_vert.svg'));
      iconRegistry.addSvgIcon(
          'delete',
          sanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete.svg'));
      iconRegistry.addSvgIcon(
        'edit',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit.svg'));
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      mySection: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.userid = localStorage.getItem('userid');
    // localStorage.setItem('username', res.user['email']);
    this.masterService.getSections()
    .subscribe(
      res => {
        this.sections = res;
        this.sections.push({_id: 'ALL', name: 'All'});
        if (localStorage.getItem('teachersection')){
          this.form.get('mySection').setValue(localStorage.getItem('teachersection'));
          this.go();
        }
      }
    );
  }
  go() {
    // const param = `${this.form.get('myClass').value}|${this.form.get('mySubject').value}|${this.form.get('exams').value}`;
    this.masterService.getTeachersBySection(this.form.get('mySection').value)
    .subscribe(
      (res) => {
        // console.log(res);
        this.teachers = res;
        // console.log(this.students[0]['name']);
        // tslint:disable-next-line:prefer-const
        let len = this.teachers.length;
        // console.log(len);
        let std: TeacherDetail;
        this.tableData.length = 0;
        for (let i = 0; i < len; i++) {
          std = {
              teacher: this.teachers[i]['_id'],
              section: this.teachers[i]['mySection'],
              PEN: this.teachers[i]['PEN'],
              name: this.teachers[i]['name'],
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
  sectionChanged(code) {
    localStorage.setItem('teachersection', code);
    this.go();
  }
  navigateBack() {
    this.location.back();
  }
  editTeacher(event, item) {
    this.router.navigate([`/teachers/${item.teacher}`]);
  }
  attendanceClick(event, item){
    // console.log(item);
    // this.masterService.insertStudent(item);
    const param = `${item.teacher}|${item.section}` ;
    // this.router.navigate([`/attendanceProgress/${param}`]);
  }
  markClick(event, item){
    // console.log(item.students);
  }
  delete(event, item) {
    if (localStorage.getItem('userType') === 'Admin') {
      if (confirm(`Delete teacher ${item.name} ?`)) {
        this.masterService.deleteTeacher(item.teacher).subscribe((dd) => {
          this.snackBar.open(`Teacher: ${item.name}  deleted successfully`, 'OK', {
            duration: 3000
          });
          this.go();
        });
      }
    } else {
      this.snackBar.open(`Only Admin can delete!`, 'OK', {
        duration: 3000
      });
    }
    // console.log(item.students);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
