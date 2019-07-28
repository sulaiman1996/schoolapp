import { MasterService } from './../../../masterservices/master.service';
import { AttendanceService } from './../../../transervice/attendance.service';
import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Location } from '@angular/common';
import { TimesheetSummaryDialogComponent } from './../../../trans/att/timesheet-summary-dialog/timesheet-summary-dialog.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

export interface StudentsData {
  teachers: string;
  students: string;
  mySubject: string;
  myClass: string;
  description: string;
  dates: string;
  att: string;
  periods: string;
  classNo: number;
  name: string;
  attendance: boolean;
  message: string;
  schoolid: string;
  mobileNo: string;
  sendSMS: boolean;
  sentSMS: boolean;
}


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class AttendanceComponent implements OnInit {
  displayedColumns: string[] = [ 'classNo', 'name', 'attendance'];
  classTypes = [{id: 'R', name: 'Regular'},
                {id: 'S', name: 'Special'}, {id: 'C', name: 'Camp'},
                {id: 'T', name: 'Tour'}, {id: 'V', name: 'Volunteer'}];
  //  dataSource = new MatTableDataSource<StudentsData>(this.ELEMENT_DATA);
  selection = new SelectionModel<StudentsData>(true, []);
  form: FormGroup;
  classes = [];
  subjects = [];
  students = [];
  lastAttendance = [];
  periods = [];
  userid: string;
  teacher: any = {};
  dataSource1: DataSource<any>;
  tableData = [];
  attendance = [];
  params = [];
  attTotal = [] ;
  att = [] ;
  name: string;
  saved = false;
  saveCaption = 'Save';
  savedSubject = '';
  sendSMS = false;
  constructor(public dialog: MatDialog, private masterService: MasterService, private attendacneService: AttendanceService,
    private fb: FormBuilder, private snackBar: MatSnackBar,  private location: Location, private datePipe: DatePipe) {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      myClass: ['', Validators.required],
      period: ['', Validators.required],
      mySubject: ['', Validators.required],
      dates: ['', Validators.required],
      type: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.userid = localStorage.getItem('userid');
    const currentDate = new Date();
    this.form.get('dates').setValue (currentDate);
    this.form.get('type').setValue(this.classTypes[0].id);
    this.masterService.getMastersForAttendance(this.userid)
    .subscribe(
      (res) => {
         this.periods = res.periods;
         this.teacher = res.teacher;
         this.subjects = res.subjects;
         this.classes = res.classes;
         if (this.classes.length > 0) {
          this.form.get('myClass').setValue(this.classes[0]._id);
         }
          if (this.subjects.length > 0) {
            this.form.get('mySubject').setValue(this.subjects[0]._id);
          }
        // console.log(res.subjects);
        // console.log(res.periods);
        // console.log(res.classes);
        // console.log(res.teacher);
      },
      err => console.log(err)
    );
  }
  changedFormData(code) {
    this.saved = false;
    this.tableData.length = 0;
    this.dataSource1  = new MatTableDataSource(this.tableData);

    // this.fillStudentData();
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.changedFormData('');
  }
  go(){
    this.fillStudentData();
  }
  fillStudentData() {
    const date = new Date(this.form.get('dates').value);
    const param = `${this.datePipe.transform(date, 'yyyy-MM-dd')}|${this.form.get('period').value}|${this.form.get('myClass').value}`;
    // console.log('datepipe ' + this.datePipe.transform(date, 'yyyy-MM-dd'));
    // this.attendacneService.getAttendanceByClass(param)
    //     .subscribe((res) => {
    //         this.attTotal = res.attTotal;
    //         this.att =  res.att;
    //         console.log(this.attTotal);
    //         console.log(this.att);
    //         // console.log(res.academic);
    //         let item;
    //         this.att.forEach((doc, index) => {
    //           // console.log(doc);
    //           item = this.attTotal.find(
    //             x => x._id.month  === doc._id.month &&  x._id.year  === doc._id.year );
    //           if (item) {
    //             doc.workingDays =  item.count;
    //           }
    //         });
    //         console.log(this.att);
    //     });
    // console.log(param);
    this.attendacneService.getAttendance(param)
        .subscribe((res) => {

        this.students = res.students;
        this.lastAttendance = res.lastAttendance;
        const header = res.attenHeader;
        // console.log('last atten');
        // console.log(res.students);
        // console.log(this.students);
        // tslint:disable-next-line:prefer-const
        let len = this.students.length;
        // console.log(this.lastAttendance);
        // console.log(this.students);
        let std: StudentsData;
        this.tableData.length = 0;
        this.saved = false;
        this.savedSubject = '';

        if (header) {
          this.form.get('type').setValue(header.type);
          this.savedSubject = this.getSubjectText(header.mySubject);
          // console.log(header.mySubject);
        } else {
          // this.form.get('type').setValue(this.classTypes[0].id);
        }
        // console.log(this.savedSubject);
        for (let i = 0; i < len; i++) {
          std = {
              teachers: this.teacher['_id'],
              students: this.students[i]['_id'],
              mySubject:  this.form.get('mySubject').value,
              myClass: this.form.get('myClass').value,
              description: '',
              dates: this.datePipe.transform(date, 'yyyy-MM-dd'),
              att: '',
              periods: this.form.get('period').value,
              classNo: this.students[i]['classNo'],
              name: this.students[i]['name'],
              // attendance: false,
              attendance: !(this.students[i].atten),
              message: null,
              schoolid: localStorage.getItem('schoolid'),
              mobileNo: this.students[i]['dialCode'] + this.students[i]['mobileNo'],
              sentSMS: (this.students[i].atten) ? (this.students[i].atten['sentSMS']) : false,
              sendSMS: (this.students[i].atten) ? (this.students[i].atten['sentSMS']) : false,
          };
          const lstAtt = this.lastAttendance.find(x => x.atten.students === this.students[i]['_id']);
          if (lstAtt) {
            std.message = `Absent on ${this.datePipe.transform(lstAtt.dates, 'dd/MM/yyyy')} ${lstAtt.period.name} `;
          }
          // console.log(this.students[i]['atten'])
          // if (!this.saved) {
          //   this.saved = this.students[i]['atten'];
          // }
          // console.log(this.students[i]);
          this.tableData.push(std);
        }
        this.saved = header !== null;
        this.saveCaption = this.saved ? 'Update' : 'Save';
        this.dataSource1  = new MatTableDataSource(this.tableData);
        // console.log(this.tableData);
      },
      err => console.log(err)
      );
  }
  isAllSelected() {
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {

  }
  update() {
    // tslint:disable-next-line:no-shadowed-variable
    let msg = '' ;
    const date = new Date(this.form.get('dates').value);
    // console.log(date.getDate());
    // console.log(date.getTimezoneOffset());
    this.tableData.forEach(element => {
      const toDo = element as StudentsData;
      toDo.dates = this.datePipe.transform(date, 'yyyy-MM-dd');
      toDo.att = toDo.attendance ? 'P' : 'A';
      toDo.periods = this.form.get('period').value;
      toDo.mySubject = this.form.get('mySubject').value;
      toDo.myClass = this.form.get('myClass').value;
      if (!toDo.sentSMS) {
        toDo.sentSMS = this.sendSMS;
      }
      if (!toDo.attendance) {
        msg = msg + toDo.classNo + ' ' + toDo.name + ' absent\n';
      }
    });
    const dt = this.tableData.filter(x => x.attendance === false);
    this.openDialog(dt);
    console.log(dt);
  }
  onChangeCheckBox(event, index, item) {
    item.attendance = !item.attendance;
    // console.log(item);
    // console.log(index);
  }
  getPeriodText(pValue): string {
    const p = this.periods.find(v => v._id === pValue)  ;
    if (p) {
      return p['name'];
    } else {
      return '';
    }
  }
  getSubjectText(pValue): string {
    // console.log(this.subjects);
    const p = this.subjects.find(v => v._id === pValue)  ;
    if (p) {
      return p['name'];
    } else {
      return '';
    }
  }
  navigateBack() {

    this.location.back();
  }
  showAttendance(event, item) {
    // this.router.navigate([`/studentdetail/${item.students}`]);

  }
  delete() {
    const date = new Date(this.form.get('dates').value);
    if (confirm(`Delete attendance for the day ${this.datePipe.transform(date, 'dd-MM-yyyy')} ?`)) {
      let param = `${this.datePipe.transform(date, 'yyyy-MM-dd')}|${this.form.get('period').value}|${this.form.get('myClass').value}|`;
      // tslint:disable-next-line:max-line-length
      param = `${param}${this.form.get('mySubject').value}|${this.teacher._id}|${this.form.get('type').value}|${localStorage.getItem('username')}|D|${localStorage.getItem('schoolid')}`;

      this.attendacneService.updateAttendance(param, this.tableData).subscribe((res) => {
        // console.log(res);
        this.saveCaption = 'Save';
        // console.log(res);
        const msg = 'Attendance for the date:' + this.datePipe.transform(res['dates'], 'dd-MM-yyyy') +
                    ' and Period ' + this.getPeriodText(res['periods']) + ' deleted' ;
        this.snackBar.open(`${msg}`, 'OK', {
          duration: 2000
        });
      });
    }
  }
  openDialog(attFiltered): void {
    const dialogRef = this.dialog.open(TimesheetSummaryDialogComponent, {
      width: '250px',
      disableClose: true,
      autoFocus: true,
      data: { absentees: attFiltered,
              message: {period: this.getPeriodText(this.form.get('period').value)}}
    });
    dialogRef.afterClosed().subscribe(saveData => {
      // console.log(saveData);
      if (saveData ) {
        // console.log('The dialog was closed for save');
        const date = new Date(this.form.get('dates').value);
        let param = `${this.datePipe.transform(date, 'yyyy-MM-dd')}|${this.form.get('period').value}|${this.form.get('myClass').value}|`;
        // tslint:disable-next-line:max-line-length
        param = `${param}${this.form.get('mySubject').value}|${this.teacher._id}|${this.form.get('type').value}`;
        param = `${param}|${localStorage.getItem('username')}|${(this.saved ? 'U' : 'S')}|${localStorage.getItem('schoolid')}`;

        this.attendacneService.updateAttendance(param, attFiltered).subscribe((res) => {
          // console.log(res);
          this.saveCaption = 'Update';
          // console.log(res['nInserted']);
          const msg = res['nInserted'] > 1 ? 'are' : 'is';
          const msgArray: any = [];
          attFiltered.forEach(element => {
                // console.log(element);
              if (this.sendSMS && !element.sendSMS) {
                const message = {};
                message['phoneNo'] = element.mobileNo;
                message['isOTP'] = false;
                message['subject'] = 'School Attendance';
                // tslint:disable-next-line:max-line-length
                message['message'] = `Dear Parent, ${element.name} ഇന്ന് ${this.datePipe.transform(date, 'dd-MM-yyyy')} ക്ലാസ്സിൽ ഹാജരായിട്ടില്ല. Principal, PMSAPTS VHSS, Kaikottukadave`;
                msgArray.push(message);
              }
          });
          // console.log(msgArray);
          if (msgArray.length > 0) {
              this.masterService.sendSMS(msgArray)
              .subscribe(
                resM => {
                  console.log(resM);
                  const resReturn = resM;
                } ,
                err => console.log(err)
              );
          }
          this.snackBar.open(`${res['nInserted']} attendance ${msg} saved`, 'OK', {
            duration: 2000
          });
        });
      } else {
        console.log('The dialog was closed for not to save');
      }
    });
  }
}

