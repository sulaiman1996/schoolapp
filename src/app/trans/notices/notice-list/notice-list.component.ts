import { Component, OnInit } from '@angular/core';
import { MasterService } from './../../../masterservices/master.service';
import {FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

export interface NoticeDetail {
  _id: string;
  date: string ;
  subject: number;
  body: string;
}
@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.css'],
})
export class NoticeListComponent implements OnInit {
  // displayedColumns: string[] = [ 'date', 'subject', 'body'];
  notices = [];
  // tableData = [];
  // dataSource: MatTableDataSource<NoticeDetail>;
  isParent = false;
  constructor(private masterService: MasterService,
    private fb: FormBuilder,
    private location: Location, private router: Router, private datePipe: DatePipe) {
 }

  ngOnInit() {
    this.isParent = localStorage.getItem('userType') === 'Parent';
    this.masterService.getNotices('a')
    .subscribe(
      res => {
        this.notices = res;
        // console.log(this.notices);
        // let Nts: NoticeDetail;
        // this.tableData.length = 0;
        // for (let i = 0; i < this.notices.length; i++) {
        //   Nts = {
        //       _id: this.notices[i]['_id'],
        //       date: this.notices[i]['date'],
        //       subject: this.notices[i]['subject'],
        //       body: this.notices[i]['body'],
        //   };
        //   this.tableData.push(Nts);
        // }
        // this.dataSource = new MatTableDataSource(this.tableData);
        // console.log(this.tableData);
        // console.log(this.dataSource);
      }
    );

  }
  onItemClick(e, item){
    if (!this.isParent){
      console.log(item);
      this.router.navigate([`/notice/${item._id}`]);
    }
  }

  navigateBack() {
    this.location.back();
  }
  newNotice(){
    if (!this.isParent){
      this.router.navigate([`/notice/__new`]);
    }
  }
}
