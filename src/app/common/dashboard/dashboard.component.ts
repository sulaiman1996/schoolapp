import { Component, OnInit } from '@angular/core';
import {MatGridListModule, MatButtonModule} from '@angular/material';
import { Router } from '@angular/router';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  menuList = [
    { title: 'Alerts', cols: 1, rows: 2, desc: '', image: 'alerts', access: ['Admin', 'Teacher', 'Parent'  ] },
    { title: 'Attendance', cols: 1, rows: 2, desc: '', image: 'att', access: ['Admin', 'Teacher', 'Parent'  ] },
    { title: 'Mark', cols: 1, rows: 1, desc: '', image: 'mark', access: ['Admin', 'Teacher', 'Parent'  ]},
    { title: 'Progress', cols: 2, rows: 1, desc: '', image: 'progress-up', access: ['Parent' ] },
    { title: 'Students', cols: 1, rows: 1, desc: '', image: 'student', access: ['Admin', 'Teacher', 'PTA']},
    { title: 'Teachers/Management', cols: 1, rows: 1, desc: '', image: 'teacher', access: ['Admin', 'Teacher' ] },
    { title: 'Tasks', cols: 1, rows: 1, desc: '', image: 'task', access: ['Admin', 'Teacher', 'Parent' ] },
    { title: 'Data Entry', cols: 1, rows: 1, desc: '', image: 'dataentry', access: ['Admin']},
    { title: 'Notice', cols: 1, rows: 1, desc: '', image: 'notice', access: ['Admin', 'Teacher', 'Parent', 'PTA' ]},
    { title: 'Reports', cols: 1, rows: 1, desc: '', image: 'report', access: ['Admin', 'Teacher', 'PTA' ] },
    { title: 'Contacts', cols: 1, rows: 1, desc: '', image: 'contacts', access: ['Admin', 'Teacher', 'Parent', 'PTA' ] },
    { title: 'Profile', cols: 1, rows: 1, desc: '', image: 'profile', access: ['Admin', 'Teacher', 'Parent', 'PTA' ] },
    { title: 'Options', cols: 1, rows: 1, desc: '', image: 'setting', access: ['Admin', 'Teacher', 'Parent', 'PTA' ] },

  ];
  menuAccess = [];
  isMobile = false;
  constructor(private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    // console.log(localStorage.getItem['userType']);
    iconRegistry.addSvgIcon('att', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/att.svg'));
    iconRegistry.addSvgIcon('mark', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/mark.svg'));
    iconRegistry.addSvgIcon('teacher', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/teacher.svg'));
    iconRegistry.addSvgIcon('student', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/student.svg'));
    iconRegistry.addSvgIcon('setting', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/setting.svg'));
    iconRegistry.addSvgIcon('progress-up', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/progress-up.svg'));
    iconRegistry.addSvgIcon('dataentry', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/dataentry.svg'));
    iconRegistry.addSvgIcon('rightarrow', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/rightarrow.svg'));
    iconRegistry.addSvgIcon('profile', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/profile.svg'));
    iconRegistry.addSvgIcon('notice', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/notice.svg'));
    iconRegistry.addSvgIcon('report', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/report.svg'));
    iconRegistry.addSvgIcon('alerts', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/alerts.svg'));
    iconRegistry.addSvgIcon('task', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/task.svg'));
    iconRegistry.addSvgIcon('contacts', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/contacts.svg'));

    // console.log('user id ' + localStorage.getItem('userType'))
    this.menuAccess = this.menuList.filter(x => x.access.includes(localStorage.getItem('userType')));
    // console.log(this.menuAccess);
   }

  ngOnInit() {
  }
  onItemClick(event, item) {
    // console.log(item)
    switch (item.title){
      case 'Progress': this.router.navigate([`/markProgress/parent`]);
            break;
      case 'Mark':
            if (localStorage.getItem('userType') !== 'Parent') {
                this.router.navigate([`/marksEntry`]);
              } else {
                this.router.navigate([`/markProgressSummary/parent`]);
              }
            break;
      case 'Attendance':
            if (localStorage.getItem('userType') !== 'Parent') {
              this.router.navigate([`/attendance`]);
            } else {
              this.router.navigate([`/attendanceProgress/parent`]);
            }
            break;
      case 'Students': this.router.navigate([`/students`]);
            break;
      case 'Teachers/Management': this.router.navigate([`/teachers`]);
            break;
      case 'Data Entry': this.router.navigate([`/masters`]);
            break;
      case 'Options': this.router.navigate([`/selector`]);
            break;
      case 'Profile': this.router.navigate([`/register/profile`]);
            break;
      case 'Notice': this.router.navigate([`/noticelist`]);
            break;
      case 'Reports': this.router.navigate([`/report`]);
            break;
      case 'Alerts': this.router.navigate([`/alerts`]);
            break;
      case 'Tasks':
            if (localStorage.getItem('userType') !== 'Parent') {
              this.router.navigate([`/task-dashboard`]);
            } else {
              this.router.navigate([`/task-report`]);
            }
            break;
      case 'Contacts': this.router.navigate([`/contacts`]);
            break;
    }
  }
}
