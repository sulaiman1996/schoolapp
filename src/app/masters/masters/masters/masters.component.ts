import { MasterService } from './../../../masterservices/master.service';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.css']
})
export class MastersComponent implements OnInit {
  masters = [];
  constructor(private router: Router, private masterService: MasterService ) { }

  ngOnInit() {
    this.masterService.getMasterList()
    .subscribe(
      res => this.masters = res,
      err => console.log(err)
    );
  }
  masterLinks(master) {
    console.log(master.param);
    // this.router.navigate([`/${master.param}`]);
    const navigationExtras: NavigationExtras = {
      queryParams: {
          // 'heading': master.name,
          'masterTable': master.id,
          // 'comboTable': master.combo,
          // 'comboField': master.comboField
      }
    };
    // this.router.navigate([`/master/${master.param}`]);
    if(master.route){
      this.router.navigate([`${master.route}`]);
    } else {
      this.router.navigate([`/master`], navigationExtras);
    }
  }
}
