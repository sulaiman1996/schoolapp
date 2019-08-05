import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css']
})
export class TaskDashboardComponent implements OnInit {
    menuList = [
      { title: 'Assignments', cols: 2, rows: 1, desc: '', image: 'assignment', access: ['Admin', 'Teacher' ] },
      { title: 'Projects', cols: 1, rows: 2, desc: '', image: 'build', access: ['Admin', 'Teacher'  ] },
      { title: 'Exams', cols: 1, rows: 2, desc: '', image: 'exam', access: ['Admin', 'Teacher' ] },
      { title: 'Fees', cols: 1, rows: 2, desc: '', image: 'payment', access: ['Admin' , 'Teacher' ] },

    ];
    menuAccess = [];
    isMobile = false;
    constructor(private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
      // console.log(localStorage.getItem['userType']);
      iconRegistry.addSvgIcon('assignment', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/assignment.svg'));
      iconRegistry.addSvgIcon('exam', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/exam.svg'));
      iconRegistry.addSvgIcon('build', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/build.svg'));
      iconRegistry.addSvgIcon('payment', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/payment.svg'));

      // console.log('user id ' + localStorage.getItem('userType'))
      this.menuAccess = this.menuList.filter(x => x.access.includes(localStorage.getItem('userType')));
      // console.log(this.menuAccess);
     }

    ngOnInit() {
    }
    onItemClick(event, item) {
      console.log(item)
      switch (item.title){
        case 'Exams': this.router.navigate([`/task-dashboard/EXAM`]);
              break;
        case 'Assignments': this.router.navigate([`/task-dashboard/ASGT`]);
              break;
        case 'Impositions': this.router.navigate([`/task-dashboard/IMP`]);
              break;
        case 'Projects': this.router.navigate([`/task-dashboard/PRJ`]);
              break;
        case 'Fees': this.router.navigate([`/task-dashboard/FEE`]);
              break;
      }
    }
  }
