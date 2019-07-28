import { Component, OnInit } from '@angular/core';

import { MasterService } from './../../../masterservices/master.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig} from '@angular/material';
@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  masters = [];
  masterTable = '';
  comboTable = '';
  comboField = '';
  heading = '';
  master: any = {};
  canSeeId = false;
  constructor(private masterService: MasterService, private router: Router,
     private route: ActivatedRoute, private snackBar: MatSnackBar,private location: Location,
     public dialog: MatDialog) {
      this.route.queryParams.subscribe(params => {
        // this.heading = params['heading'],
        this.masterTable = params['masterTable'];
        // this.comboTable = params['comboTable'];
        // this.comboField = params['comboField'];
        });

     }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.masterName = params.data;
    //   console.log('ngOnInit: ' + this.masterName);
    // });
    this.masterService.getMasterListById(this.masterTable).subscribe(res => {
          this.master = res;
          console.log(this.master);
          if (this.master.canSeeId) {
            this.canSeeId = this.master.canSeeId;
          }
          let param = this.masterTable;
          if (this.master.schoolid) {
            param = param + '|' + localStorage.getItem('schoolid');
          }
          this.masterService.getMasters(param)
            .subscribe(
              resp => this.masters = resp,
              err => console.log(err)
            );
          // tslint:disable-next-line:forin
    });
    // this.masterService.getMasterList()
    // .subscribe(
    //   res => this.masters = res,
    //   err => console.log(err)
    // );
  }
  naviageMaster(master){
    // this.router.navigate([`/masteredit/${master._id}`]);
    let id = '';
    if (master === '') {
      id = '__new';
    } else {
      id = master._id;
    }
    // console.log('edit clicked ', this.masterName, + '   ' + master.name);
    // this.router.navigate(['/masteredit', `${this.masterTable}`, `${id}`]);
    const navigationExtras: NavigationExtras = {
      queryParams: {
          // 'heading': this.heading,
          'masterTable': this.masterTable,
          // 'comboTable': this.comboTable,
          // 'comboField': this.comboField,
          'id': id
      }
    };
    this.router.navigate(['/masteredit'], navigationExtras);
  }
  navigateBack() {
    this.location.back();
  }
  delete(master) {
    if (confirm(`delete ${master.name} ?`)) {
      this.masterService.deleteMaster(master, this.masterTable).subscribe((dd) => {
        // var res = this.gridApi.updateRowData({ remove: selectedData });
      this.snackBar.open(`${this.masterTable.toLocaleUpperCase()}: ${master.name}  deleted successfully`, 'OK', {
          duration: 3000
        });
        const index: number = this.masters.indexOf(master);
        if (index !== -1) {
          this.masters.splice(index, 1);
        }
      });
    } else {
      // Do nothing!
    }
  }
}
