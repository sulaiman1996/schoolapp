import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MasterService } from './../../../masterservices/master.service';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl,
 } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-masteredit',
  templateUrl: './masteredit.component.html',
  styleUrls: ['./masteredit.component.css']
})
export class MastereditComponent implements OnInit {
  updateForm: FormGroup;
  id: String;
  masterTable: String;
  selected: any = {};
  isSave = true;
  addNew = true;
  disableSave = false;
  heading1 = 'Edit';
  newId = '__new' ;
  combo = [];
  combo1 = [];
  addCombo = false;
  master: any = {};
  addField: '';
  canSeeId = false;
  // tslint:disable-next-line:max-line-length
  constructor(private masterService: MasterService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder,  private location: Location ) {
    this.route.queryParams.subscribe(params => {
      // this.heading = params['heading'];
      this.masterTable = params['masterTable'];
      // this.comboTable = params['comboTable'];
      // this.comboField = params['comboField'];
      this.id = params['id'];
      this.addNew = params.id === this.newId;
      });
    this.createForm();
  }
  createForm() {
    this.updateForm = this.fb.group({
      // _id: [{value: '', disabled: !this.addNew}, ],
      name: ['', Validators.required]
    });

  }
  ngOnInit() {
    this.masterService.getMasterListById(this.masterTable).subscribe(res => {
        this.master = res;
        // console.log('master list: ', this.master);
        if (this.master.canSeeId) {
          this.canSeeId = this.master.canSeeId;
        }
        if (this.canSeeId) {
          this.updateForm.addControl('_id', new FormControl('', Validators.required));
        }
        if (this.master.addField) {
          this.addField = this.master.addField.name;
          this.updateForm.addControl(this.master.addField.name, new FormControl('', Validators.required));
        }
        if (this.master.combo) {
          this.updateForm.addControl(this.master.combo.comboField, new FormControl('', Validators.required));
          this.addCombo = true;
          this.masterService.getMasters(this.master.combo.table +
            (this.master.combo.schoolid ? `|${localStorage.getItem('schoolid')}` : ''))
            .subscribe(
              res1 => this.combo = res1,
              err => console.log(err)
            );
        }
        if (this.master.combo1) {
          this.updateForm.addControl(this.master.combo1.comboField, new FormControl('', Validators.required));
          this.masterService.getMasters(this.master.combo1.table
            + (this.master.combo.schoolid ? `|${localStorage.getItem('schoolid')}` : ''))
            .subscribe(
              (res1) => {
                this.combo1 = res1;
                if (this.master.combo1.table === 'academic' && localStorage.getItem('academic') ){
                  this.updateForm.get(this.master.combo1.comboField).setValue(localStorage.getItem('academic'));
                }
              } ,
              (err) => {console.log(err); }
            );
        }
          // console.log('master out: ', this.master);


        if (this.canSeeId) {
          const _idControl = this.updateForm.get('_id');
          _idControl.setValidators([Validators.required]);
        }
        // console.log('canseeid: ' + this.canSeeId)
        this.heading1 = this.addNew ? 'Create New' : 'Edit';
        if (this.master.sequenceName && this.addNew ){
          this.updateForm.get('_id').setValue('0');
        }

        localStorage.getItem('academic')
        if (!this.addNew) {
          this.isSave = false;
          this.masterService.getMastersById({id: this.id, table: this.masterTable}).subscribe(res2 => {
            this.selected = res2;
            // console.log(this.selected);
            // tslint:disable-next-line:forin
            for (const field in this.updateForm.controls) {
              this.updateForm.get(field).setValue(this.selected[field]);
            }
          });
        }
    });
  }
  navigateBack() {
    this.location.back();
  }
  update() {

    if (this.updateForm.invalid) {
      return;
    }
    // tslint:disable-next-line:forin
    for (const field in this.updateForm.controls) {
      this.selected[field] = this.updateForm.get(field).value;
       console.log(field + ':' + this.selected[field]);
    }
    if (this.master.schoolid) {
      this.selected['schoolid'] = localStorage.getItem('schoolid');
    }
    // console.log('save : ' + this.selected);
    let seq = '';
    if (this.master.sequenceName)
    {
      seq = this.master.sequenceName;
    }
    // tslint:disable-next-line:max-line-length
    this.masterService.updateMaster({id: this.id, table: this.masterTable, username: localStorage.getItem('username') }, this.selected, seq).subscribe((res) => {
      this.snackBar.open(`${this.masterTable.toLocaleUpperCase()} ${res['message']}`, 'OK', {
        duration: 3000
      });
      if (this.id === this.newId && res['status'] === 'S' ) {
      // this.router.navigate([`/example`]);
        this.disableSave = true;
        // this.router.navigate([`/studentdetail/${res['id']}`]);
        const navigationExtras: NavigationExtras = {
          queryParams: {
              // 'heading': this.heading,
              'masterTable': this.masterTable,
              // 'comboTable': this.comboTable,
              // 'comboField': this.comboField,
              'id': this.id
          }
        };
        this.router.navigate(['/masteredit'],  navigationExtras);
      }
    });

  }
}
