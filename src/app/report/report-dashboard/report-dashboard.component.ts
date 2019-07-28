import { Component, OnInit } from '@angular/core';
import {MatGridListModule, MatButtonModule} from '@angular/material';
import { Router } from '@angular/router';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.css']
})
export class ReportDashboardComponent implements OnInit {
  menuList = [
    { title: 'Student Category Count', cols: 2, rows: 1, desc: '', image: 'stdcount', access: ['Admin', 'Teacher' ] },
    { title: 'Print Progress', cols: 1, rows: 2, desc: '', image: 'print', access: ['Admin', 'Teacher'  ] },
    { title: 'Attendance Taken', cols: 1, rows: 2, desc: '', image: 'att', access: ['Admin', 'Teacher' ] },
    { title: 'Attendance Teachers', cols: 1, rows: 2, desc: '', image: 'att', access: ['Admin' ] },

  ];
  menuAccess = [];
  isMobile = false;
  constructor(private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    // console.log(localStorage.getItem['userType']);
    iconRegistry.addSvgIcon('att', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/att.svg'));
    iconRegistry.addSvgIcon('stdcount', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/stdcount.svg'));
    iconRegistry.addSvgIcon('print', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/print.svg'));
    iconRegistry.addSvgIcon('print', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/print.svg'));

    // console.log('user id ' + localStorage.getItem('userType'))
    this.menuAccess = this.menuList.filter(x => x.access.includes(localStorage.getItem('userType')));
    // console.log(this.menuAccess);
   }

  ngOnInit() {
  }
  onItemClick(event, item) {
    console.log(item)
    switch (item.title){
      case 'Student Category Count': this.router.navigate([`/report-student-category`]);
            break;
      case 'Print Progress': this.router.navigate([`/print-progress`]);
            break;
      case 'Attendance Teachers': this.router.navigate([`/attendance-teacher-report`]);
            break;

      case 'Attendance Taken':
            if (localStorage.getItem('userType') !== 'Parent') {
                this.router.navigate([`/attendance-taken`]);
              } else {
                // this.router.navigate([`/attendance-taken`]);
              }
            break;
    }
  }
}
