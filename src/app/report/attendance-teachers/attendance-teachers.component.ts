import { MasterService } from './../../masterservices/master.service';
import { AttendanceService } from './../../transervice/attendance.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
export interface AttendanceData {
  TeacherId: string;
  Name: string;
  M01: number;
  M02: number;
  M03: number;
  M04: number;
  M05: number;
  M06: number;
  M07: number;
  M08: number;
  M09: number;
  M10: number;
  M11: number;
  M12: number;
  Total: number;
}
@Component({
  selector: 'app-attendance-teachers',
  templateUrl: './attendance-teachers.component.html',
  styleUrls: ['./attendance-teachers.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class AttendanceTeachersComponent implements OnInit {
  form: FormGroup;
  data = [];
  attForTeacher = [];
  sections = [];
  leaveTypes = [];
  tableData = [];
  cardHeight = 100;
  cardHead = '';
  displayedColumns: string[] = [ 'Name', 'M01', 'M02', 'M03', 'M04', 'M05', 'M06', 'M07'
                                  , 'M08', 'M09', 'M10', 'M11', 'M12', 'Total' ];
  dataSource: MatTableDataSource<AttendanceData>;
  message = '';
  dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  showCard = false;
  constructor(private attendacneService: AttendanceService, private router: Router,
    private route: ActivatedRoute, private location: Location, private masterService: MasterService, private fb: FormBuilder
    , private datePipe: DatePipe) {
   this.createForm();

  }
  createForm() {
    this.form = this.fb.group({
      year: ['', Validators.required],
      mySection: ['', Validators.required],
      leaveType: ['', Validators.required]
    });
  }

  ngOnInit() {
    const currentDate = new Date();
    this.form.get('year').setValue (currentDate.getFullYear());
    this.masterService.getMastersForTeacherAttendanceReport()
    .subscribe(
      (res) => {
         this.leaveTypes = res.attTypes;
         this.sections = res.sections;
        //  console.log(this.leaveTypes);
        //  console.log(this.sections);
      },
      err => console.log(err)
    );
  }
  teacherAttendance() {
    // tslint:disable-next-line:max-line-length
    const param = `${this.form.get('mySection').value}|${this.form.get('year').value}|${this.form.get('leaveType').value}|${localStorage.getItem('schoolid')}`;
    this.message = '';
    this.showCard = false;
    // console.log(param);
    this.tableData.length = 0;
    this.attendacneService.getTeacherAttendanceReport(param)
    .subscribe((res) => {
      this.data = res;

      //  console.log(this.data);
       let atten: AttendanceData;
       let name = '';
       if (this.data.length > 0) {
          name = this.data[0]._id.name;
          atten = { TeacherId: this.data[0]._id.teacher,
            Name: name, M01: null, M02: null, M03: null, M04: null, M05: null, M06: null
            , M07: null, M08: null, M09: null, M10: null, M11: null, M12: null, Total: 0,
          };
        }
       let tot = 0;
       this.data.forEach(element => {
          if (name === element._id.name) {

          } else {
            atten.Total = tot;
            this.tableData.push(atten);
            tot = 0;
            name = element._id.name;
            atten = { TeacherId: element._id.teacher,
              Name: name, M01: null, M02: null, M03: null, M04: null, M05: null, M06: null
              , M07: null, M08: null, M09: null, M10: null, M11: null, M12: null, Total: 0,
            };
          }
          if (element._id.att) {
            switch  (element._id.month) {
              case 1: atten.M01 = element.total; break;
              case 2: atten.M02 = element.total; break;
              case 3: atten.M03 = element.total; break;
              case 4: atten.M04 = element.total; break;
              case 5: atten.M05 = element.total; break;
              case 6: atten.M06 = element.total; break;
              case 7: atten.M07 = element.total; break;
              case 8: atten.M08 = element.total; break;
              case 9: atten.M09 = element.total; break;
              case 10: atten.M10 = element.total; break;
              case 11: atten.M11 = element.total; break;
              case 12: atten.M12 = element.total; break;
            }
          }
          tot = tot + element.total;
        });
        atten.Total = tot;
        this.tableData.push(atten);
        this.dataSource = new MatTableDataSource(this.tableData);
    });
  }
  attendanceForOneTeacher(e, item) {
    console.log(item.TeacherId);
    const param = `${item.TeacherId}|${this.form.get('year').value}|${this.form.get('leaveType').value}`;
    this.message = '';
    // console.log(param);
    this.tableData.length = 0;
    this.attendacneService.getTeacherAttendanceByTeacherReport(param)
    .subscribe((res) => {
      this.attForTeacher = res;
      this.cardHeight =  32  + this.attForTeacher.length * 20;
      this.showCard = true;
      this.cardHead = '';
      if (this.attForTeacher.length > 0){
        this.cardHead = `${this.attForTeacher[0].PEN}-${this.attForTeacher[0].name}  ${this.form.get('leaveType').value} on  ` ;
      } else {
        this.cardHead = `No data for ${item.Name}`;
      }
      console.log(this.attForTeacher);
    });

  }
}
