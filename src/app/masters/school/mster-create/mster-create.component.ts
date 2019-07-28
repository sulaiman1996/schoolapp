import { Component, OnInit } from '@angular/core';
import { MasterService } from './../../../masterservices/master.service';
import { MatTableDataSource, MatSnackBar, MatMenuModule, MatFormFieldModule } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import * as myGlobals from '../../../global';

@Component({
  selector: 'app-mster-create',
  templateUrl: './mster-create.component.html',
  styleUrls: ['./mster-create.component.css']
})
export class MsterCreateComponent implements OnInit {
  displayedColumns: string[] = [ 'name', 'divisions'];
  form: FormGroup;
  dataSource: any;
  selected: any = {};
  constructor(private masterService: MasterService, private location: Location, private router: Router) {

   }

  ngOnInit() {
    this.selected['_id'] = '14010';
    this.selected['name'] = 'GHSS Trikarpur';
    this.selected['address1'] = 'Town';
    this.selected['address2'] = 'address2';
    this.selected['city'] = 'Trikarpur';
    this.selected['district'] = 'Kasargod';
    this.selected['state'] = 'Kerala';
    this.selected['pin'] = '671310';
    this.selected['email'] = 'gvhss@gmail.com';
    this.selected['phone'] = '22210334';
    this.selected['mobile'] = '988888188';
    this.selected['country'] = {
      '_id' : 'IN',
      'name' : 'India',
      'dialCode' : '+91',
      'maxLength' : 10.0
  };
    this.masterService.setSchoolDataMaster('school', this.selected);
    console.log(this.masterService.schoolData.school);
  }
  fillData() {
  }
}
