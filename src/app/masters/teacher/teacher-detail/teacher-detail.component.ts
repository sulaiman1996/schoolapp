import { Component, OnInit,  ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MasterService } from './../../../masterservices/master.service';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, FormArray,
 } from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatDialog} from '@angular/material';
import { PhotoUploadComponent } from './../../../tools/photo-upload/photo-upload.component';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class TeacherDetailComponent implements OnInit, AfterViewInit {
  id: String;
  selected: any = {};
  updateForm: FormGroup;
  users = [];
  genders = [];
  classes = [];
  sections = [];
  religions = [];
  castes = [];
  subjects = [];
  castesfiltered = [];
  isSave = true;
  disableSave = false;
  maxLength = 10;
  countries = [];
  dialcode = '';
  selectedImage: File = null;
  url: any = null;
  @ViewChild('pen') penText: ElementRef;

  // tslint:disable-next-line:max-line-length
  constructor(private masterService: MasterService, private router: Router,
    private route: ActivatedRoute, private snackBar: MatSnackBar
    , private fb: FormBuilder, public dialog: MatDialog) {
    this.createForm();
  }
  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      PEN: ['', [Validators.required, ]],
      address: ['', Validators.required],
      myClasses: '',
      dob: '',
      dateOfJoin: ['', Validators.required],
      myUser: [''],
      mySubjects: ['', Validators.required],
      // myRelegion: '',
      // myCaste: '',
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]*$'),
          Validators.minLength(10), Validators.maxLength(10)]],
      myGender: ['', Validators.required],
      mySection: ['', Validators.required],
      loginAutoCreated: true,
      dialCode: '',
      designation: '',
      orderby: 0,
    });
  }
  // get fData() {
  //   return this.updateForm.get('myClasses') as FormArray;
  // }
  ngAfterViewInit(){
    // this.penText.nativeElement.focus();
    // this.penText.nativeElement.focus();
    // console.log(this.imgElement.nativeElement.src);
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.masterService.getMastersForTeacherEntry()
      .subscribe(
        resMasters => {
          this.users = resMasters.users;
          this.genders = resMasters.genders;
          this.religions = resMasters.religions;
          this.castes = resMasters.castes;
          this.castesfiltered = resMasters.castes;
          this.classes = resMasters.classes;
          this.subjects = resMasters.subjects;
          this.sections = resMasters.sections;
          this.countries = resMasters.country;
          const control = <FormArray>this.updateForm.controls['myClasses'];
          // // console.log('ngOnInit: '+this.id);
          // // console.log(this.id);
          if (this.id !== '__new'){
            this.isSave = false;
            this.masterService.getTeacherById(this.id).subscribe(res => {
              this.selected = res;
              // console.log(this.selected);
              // tslint:disable-next-line:forin
              if (this.selected.photoLocation) {
                // this.applyStyles();
                this.downloadPhoto(this.selected.photoLocation);
              }
              for (const field in this.updateForm.controls) {
                if (field === 'myClasses') {
                  this.updateForm.get(field).setValue(this.getSelectData(this.selected[field], this.classes));
                } else if (field === 'mySubjects') {
                  this.updateForm.get(field).setValue(this.getSelectData(this.selected[field], this.subjects));
                } else if (field === 'dialCode') {
                  const c = this.countries.find(cc => cc.dialCode === this.selected[field]);
                  if (c) {
                    // console.log(c);
                    this.maxLength = c.maxLength;
                    this.updateForm.get(field).setValue(c.dialCode)
                  }
                } else {
                  this.updateForm.get(field).setValue(this.selected[field]);
                }
              }
            });
          } else {
            this.updateForm.get('myUser').clearValidators();
            this.updateForm.get('myUser').updateValueAndValidity();
            this.updateForm.get('myUser').disable();
            this.updateForm.get('myUser').setValue(undefined);
            // default values
            // this.updateForm.get('name').setValue('Gopi');
            // this.updateForm.get('dob').setValue('1993-06-08T18:30:00.000Z');
            // this.updateForm.get('dateOfJoin').setValue('2016-06-08T18:30:00.000Z');
            // this.updateForm.get('mobileNo').setValue('0000010011');
            // this.updateForm.get('myGender').setValue('M');
            // this.updateForm.get('mySection').setValue('HSS');
            // this.updateForm.get('address').setValue('TKR');
            // this.updateForm.get('PEN').setValue('000010');
          }
        },
        err => console.log(err)
      );
    });
  }
  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.url = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }
  applyStyles() {
    // let photo = item.photoLocation;
    // if (!photo) {
    //   if (item.myGender === 'F') {
    //     photo = 'teacher-photo-female.png';
    //   } else {
    //     photo = 'teacher-photo-male.jpeg';
    //   }
    // }
    const styles = {'background-image' : `url('${this.masterService.getNodeServerPath()}static/uploads/${this.selected.photoLocation}')`};
    // const styles = {'color' : 'red'};
    // console.log(styles);
    return styles;
  }
  downloadPhoto(filename){
    // const filename = 'image-1559459021906.jpg';
    this.masterService.downloadFile(filename)
    .subscribe(
        data => {
          console.log(data);
          // saveAs(data, filename);
          // this.imageSrc = URL.createObjectURL(data);
          this.createImageFromBlob(data);
        },
        error => console.error(error)
    );
  }

  getSelectData(dataFromTable, listData) {
    const array: any[] = [];
    array.length = 0;
    dataFromTable.forEach((value, index) => {
      const itemIndex = listData.find(x => x._id === value);
      array.push(itemIndex);
    });
    return array;
  }
  // getSelectData1(dataFromTable, listData) {
  //   var array1: any[] = [];
  //   array1.length = 0;
  //   dataFromTable.forEach((value, index) => {
  //     const itemIndex = listData.find(x => x._id === value);
  //     array1.push(itemIndex);
  //   });
  //   return array1;
  // }
  changedReligion(code){
    // console.log(code);
    this.castesfiltered = this.castes.filter(f => f.religions === code);
    if(this.castesfiltered.length > 0) {
      this.updateForm.get('myCaste').setValue(this.castesfiltered[0]._id);
    }
  }
  update() {

    if (this.updateForm.invalid) {
      return;
    }
    // tslint:disable-next-line:forin
    for (const field in this.updateForm.controls) {
      this.selected[field] = this.updateForm.get(field).value;
      // console.log(field + ':' + this.selected[field]);
    }
    this.selected['schoolid'] = localStorage.getItem('schoolid');
      // console.log( this.selected);
    const loginCreate = this.updateForm.get('loginAutoCreated').value ? 1 : 0;
    this.masterService.updateTeacher(`${this.id}|${localStorage.getItem('username')}|${localStorage.getItem('schoolid')}|${loginCreate}`,
    this.selected).subscribe((res) => {
      // tslint:disable-next-line:forin
      // for (const prop in res) {
      //   console.log(prop + ' ' + res[prop]);
      // }
      // console.log(res);

      this.snackBar.open(`Teacher ${res['message']}`, 'OK', {
        duration: 3000
      });
      if (this.id === '__new' && res['status'] === 'S' ) {
      // this.router.navigate([`/example`]);
        this.disableSave = true;
      }
      this.router.navigate([`/teacherdetail/${res['id']}`]);
    }, (err) => {
      console.log(err);
      this.snackBar.open(err.error, 'OK', {
        duration: 3000
      });
    });

  }
  onCountrySelection(code) {
    // console.log(this.maxLength, code);
    const c = this.countries.find(cc => cc.dialCode === code);
    if (this.maxLength !== c.maxLength) {
      this.updateForm.get('mobileNo').setValue('');
    }
    this.maxLength = c.maxLength;
    this.selected['dialCode'] = code;
    // tslint:disable-next-line:max-line-length
    this.updateForm.controls['mobileNo'].setValidators([Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(this.maxLength) , Validators.maxLength(this.maxLength)]);
 }
  onMobileNoChange(searchValue: string) {
    // console.log(searchValue);
    if (!this.updateForm.get('loginAutoCreated').value) {
      this.masterService.getUserByMobile(searchValue)
      .subscribe(u => {
        // console.log(u);
        if  ( u.length > 0 ) {
          this.updateForm.get('myUser').setValue(u[0]._id);
        }
      });
    }
  }
  onDeselectLogin(){
    this.updateForm.get('myUser').setValue(undefined);
  }
  updateChecked(e) {
    // // console.log(e.checked);
    if (e.checked) {
      this.updateForm.get('myUser').clearValidators();
      this.updateForm.get('myUser').updateValueAndValidity();
      this.updateForm.get('myUser').setValue(undefined);
      this.updateForm.get('myUser').disable();
    } else {
      this.updateForm.get('myUser').setValidators([Validators.required]);
      this.updateForm.get('myUser').updateValueAndValidity();
      this.updateForm.get('myUser').enable();
    }
  }
  changePhoto() {
    if (this.id !== '__new'){
      this.openDialog();
    }
  }
  upload() {
    const fd = new FormData();
    fd.append('teacher-photo', this.selectedImage, this.selectedImage.name);

    this.masterService.uploadTeacherPhoto(this.id, fd).subscribe((res) => {
      console.log(res);
    });
  }
  onFileSelect() {
      const reader = new FileReader();
      console.log(this.selectedImage);
      reader.readAsDataURL(this.selectedImage); // read file as data url
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (e: any) => { // called once readAsDataURL is completed
        this.url = e.target.result;
      };
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PhotoUploadComponent, {
      width: '250px',
      disableClose: true,
      autoFocus: true,
      data: this.url
    });
    dialogRef.afterClosed().subscribe(saveData => {
      // console.log(saveData);
      if (saveData) {
        if (saveData['file']) {
          this.selectedImage = saveData['file'];
          this.onFileSelect();
          this.upload();
        }
      } else {
        console.log('The dialog was closed for not to save');
      }
    });
  }
}
