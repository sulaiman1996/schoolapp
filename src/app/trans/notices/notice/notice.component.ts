import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MasterService } from './../../../masterservices/master.service';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, FormArray, FormGroupDirective, NgForm,
 } from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, ErrorStateMatcher} from '@angular/material/core';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class NoticeComponent implements OnInit {
  form: FormGroup;
  selected: any = {};
  classes = [];
  noticeId = '';
  disableSave = false;
  heading = 'New Notice' ;
  priority  = ['High', 'Meduim', 'Low'];
  matcher = new MyErrorStateMatcher();
  constructor(private masterService: MasterService,  private fb: FormBuilder,
    private snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router,
    private location: Location, private datePipe: DatePipe ) {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      subject: ['', Validators.required],
      openOn: ['', [Validators.required, ] ],
      myClass: '',
      noticeBody: '',
      priority: '',
      creator: '',
      closedOn: '',
    }, { validator: [this.validateOpenCloseDate] });
  }
  validateOpenCloseDate(group: FormGroup) {
    // tslint:disable-next-line:max-line-length
    // console.log(this.datePipe.transform(group.controls.openOn.value, 'yyyy-MM-dd') > this.datePipe.transform(group.controls.closedOn.value, 'yyyy-MM-dd'));
    return (group.controls.openOn.value > group.controls.closedOn.value) ? { notValid: true } : null;
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.noticeId = params.id;
      this.masterService.getClasses()
        .subscribe(
          res => {
            this.classes = res;
            this.classes.push({'_id' : 'All', 'name' : 'All Classes', 'divisions' : 'All', '__v' : 0});
            this.form.get('myClass').setValue('All');
          }, err => {
             console.log(err);
          });
      if (this.noticeId !== '__new') {
        this.heading = 'Update Notice';
        // console.log(this.noticeId);
        this.masterService.getNotice(this.noticeId)
          .subscribe(
            res => {
              this.selected = res;
              // tslint:disable-next-line:forin
              for (const field in this.form.controls) {
                this.form.get(field).setValue(this.selected[field]);
                // console.log(this.selected[field]);
              }
            }, err => {
                 console.log(err);
        });
        } else {
          this.form.get('openOn').setValue(new Date());
          this.form.get('closedOn').setValue(new Date());
          this.form.get('priority').setValue(this.priority[0]);
          this.form.get('creator').setValue(localStorage.getItem('username'));
        }
    });
  }
  update() {
    if (this.form.invalid) {
      return;
    }
    // tslint:disable-next-line:forin
    for (const field in this.form.controls) {
      this.selected[field] = this.form.get(field).value;
      // console.log(field + ':' + this.selected[field]);
    }
    this.selected['closedOn'] = this.datePipe.transform(this.form.get('closedOn').value, 'yyyy-MM-dd');
    this.selected['openOn'] = this.datePipe.transform(this.form.get('openOn').value, 'yyyy-MM-dd');
    this.selected['schoolid'] = localStorage.getItem('schoolid');

    this.masterService.updateNotice(`${this.noticeId}|${localStorage.getItem('username')}|${localStorage.getItem('schoolid')}`
    , this.selected).subscribe((res) => {
      this.snackBar.open(`Notice ${res['message']}`, 'OK', {
        duration: 3000
      });
      if (this.noticeId === '__new' && res['status'] === 'S' ) {
        this.disableSave = true;
        // this.router.navigate([`/notice/${res['id']}`]);
      }
    });

  }
  navigateBack() {
    this.location.back();
  }
}
