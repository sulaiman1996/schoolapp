import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from '../global';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  servPath = '';
  selectedStudent: any = {};
  constructor(private http: HttpClient) {
    // if (myGlobals.debugApp) {
    //   this.servPath = myGlobals.serverpath;
    // }
    if (environment.debug) {
      this.servPath = environment.serverpath;
    }
  }

  updateAttendance(id, att) {
    // console.log('service: ' + att);
    // console.log(this.servPath);
    if (att) {
      return this.http.post(`${this.servPath}attendanceroutes/attendance/update/${id}`, att);
    }
  }
  // used attendance entry
  getAttendance(param) {
    // console.log('service: ' + param);
    // console.log(this.servPath);
    if (param) {
      //  console.log('service: ' + param);
      return this.http.get<any>(`${this.servPath}attendanceroutes/attendance/${param}`);
    }
  }
  getAttendanceByClass(param) {
    if (param) {
      // console.log('service: ' + param);
      return this.http.get<any>(`${this.servPath}attendanceroutes/attendanceByClass/${param}`);
    }
  }
  getAttendanceMonthlyByStudent(param) {
    if (param) {
      // console.log('service: ' + param);
      return this.http.get<any>(`${this.servPath}attendanceroutes/attendanceMonthlyByStudent/${param}`);
    }
  }
  getAttendanceByStudentForMonth(param) {
    if (param) {
      // console.log('service: ' + param);
      return this.http.get<any>(`${this.servPath}attendanceroutes/attendanceByStudentForMonth/${param}`);
    }
  }
  getAttendanceByMonth(param) {
    if (param) {
      // console.log('service: ' + param);
      return this.http.get<any>(`${this.servPath}attendanceroutes/attendanceMonthly/${param}`);
    }
  }
  getAttendanceTakenByClass(param) {
    if (param) {
      // console.log('service: ' + param);
      return this.http.get<any>(`${this.servPath}attendanceroutes/attendanceTakenByClass/${param}`);
    }
  }


  // *********Teacher attendance **************
  getTeacherAttendance(param) {
    // console.log('service: ' + param);
    // console.log(this.servPath);
    if (param) {
      // console.log('service: ' + param);
      return this.http.get<any>(`${this.servPath}teacherattendanceroutes/attendance/${param}`);
    }
  }
  updateTeacherAttendance(id, att) {
    // console.log('service: ' + att);
    // console.log(this.servPath);
    if (att) {
      return this.http.post(`${this.servPath}teacherattendanceroutes/attendance/update/${id}`, att);
    }
  }
  getTeacherAttendanceReport(param) {
    if (param) {
      // console.log('service: ' + param);
      return this.http.get<any>(`${this.servPath}teacherattendanceroutes/attendanceReport/${param}`);
    }
  }
  getTeacherAttendanceByTeacherReport(param) {
    if (param) {
      // console.log('service: ' + param);
      return this.http.get<any>(`${this.servPath}teacherattendanceroutes/attendanceByTeacherReport/${param}`);
    }
  }
}
