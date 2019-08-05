import { MasterService } from './../../masterservices/master.service';
import { Component, OnInit } from '@angular/core';
// import {MatGridListModule, MatButtonModule} from '@angular/material';
import { Router } from '@angular/router';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  isMobile = false;
  teachers = [];
  constructor(private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer
    , private masterService: MasterService) {
    // this.menuAccess = this.menuList.filter(x => x.access.includes(localStorage.getItem('userType')));
   }
   go() {
    // const param = `${this.form.get('myClass').value}|${this.form.get('mySubject').value}|${this.form.get('exams').value}`;
    this.masterService.getTeachersBySectionPhoto('VHS')
    .subscribe(
      (res) => {
        // console.log(res);
        this.teachers = res;
        // console.log(this.tableData);
      },
      err => console.log(err)
      );
  }
  applyStyles(item) {
    let photo = item.photoLocation;
    if (!photo) {
      if (item.myGender === 'F') {
        photo = 'teacher-photo-female.png';
      } else {
        photo = 'teacher-photo-male.jpeg';
      }
    }
    const styles = {'background-image' : `url('${this.masterService.getNodeServerPath()}static/uploads/${photo}')`};
    // const styles = {'color' : 'red'};
    // console.log(styles);
    return styles;
  }
  teacherPhot(item) {
    const styles =  `${this.masterService.getNodeServerPath()}static/uploads/${item.photoLocation}`;
    // const styles = {'color' : 'red'};
    // console.log(styles);
    return styles;
  }
  ngOnInit() {
    this.go();
  }
  onItemClick(event, item) {

    switch (item.title){

    }
  }
}
