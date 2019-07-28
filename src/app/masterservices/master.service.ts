import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import * as myGlobals from '../global';
import { Observable } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { catchError } from 'rxjs/operators';
import { error } from 'protractor';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MasterService {
  // private url = myGlobals.serverpath + "masters/divisions";
  servPath = '';
  selectedStudent: any = {};
  selectorMessage = '';
  schoolData: any = {};
  schoolidRegistration = '';
  constructor(private http: HttpClient) {
    // if (myGlobals.debugApp) {
    //   this.servPath = myGlobals.serverpath;
    // }
    if (environment.debug) {
      this.servPath = environment.serverpath;
    }
  }
  getNodeServerPath(){
    return this.servPath;
  }
  private handleError(errorResponse: HttpErrorResponse){
    if (errorResponse.error  instanceof ErrorEvent) {
      console.error('Client side Error: ', errorResponse.error.message);
    } else {
      console.error('Server side  Error: ', errorResponse);
    }
    return new ErrorObservable(errorResponse.error);
  }
  setSchoolIdRegistration(data) {
    this.schoolidRegistration = data.toString().trim() ;
  }
  setSchoolDataMaster(objname, data){
    delete this.schoolData[objname];
    this.schoolData[objname] = data ;
    console.log(this.schoolData);
  }
  setselectorMessage(data){
    this.selectorMessage = data ;
  }
  insertStudent(data){
    this.selectedStudent = data ;
  }
  getDivisions(){
    return this.http.get<any>(this.servPath + "masters/divisions");
  }
  addDivision(division){
    return this.http.post<any>(`${this.servPath}masters/divisions`,division);
    // return this.http.post(`${this.uri}/issues/add`, issue);
  }

  deleteDivision(id) {
    console.log('delete id:',id);
    return this.http.get(`${this.servPath}masters/divisions/delete/${id}`);
  }
  getMasterList() {
    return this.http.get<any>(`${this.servPath}masterlist/masters`);
  }
  getMasterListById(id) {
    console.log('getMasterListById id:', id);
    return this.http.get<any>(`${this.servPath}masterlist/masters/${id}`);
  }
  getMasters(master) {
    return this.http.get<any>(`${this.servPath}masters/masters/${master}`);
  }
  getMastersById(master) {
    console.log(master);
    const id = `${master.id}|${master.table}`;
    return this.http.get<any>(`${this.servPath}masters/master/${id}`);
  }
  updateMaster(master, masterData, sequenceName) {
    const id = `${master.id}|${master.table}|${sequenceName}|${master.username}|${localStorage.getItem('schoolid')}`;
    return this.http.post(`${this.servPath}masters/master/update/${id}`, masterData);
  }
  deleteMaster(master, masterName) {
    const id = `${master._id}|${masterName}|${localStorage.getItem('username')}|${localStorage.getItem('schoolid')}`;
    return this.http.get(`${this.servPath}masters/master/delete/${id}`);
  }

  ////// Students
  getStudents() {
    return this.http.get<any>(`${this.servPath}masters/students/${localStorage.getItem('schoolid')}`);
  }
  getStudentsByUser(userid) {
    return this.http.get<any>(`${this.servPath}masters/studentsByUser/${userid}`);
  }
  getStudentById(id) {
     console.log('service id is :' + id);
    return this.http.get<any>(`${this.servPath}masters/studentById/${id}`);
    // return this.http.get(`${this.uri}/issues/${id}`);
  }
  getStudentByClass(cls) {
    console.log('service id is :' + cls);
    return this.http.get<any>(`${this.servPath}masters/studentsByClass/${cls}|${localStorage.getItem('schoolid')}`);
    // return this.http.get(`${this.uri}/issues/${id}`);
  }
  updateStudent(id, student) {
    return this.http.post(`${this.servPath}masters/students/update/${id}`, student);
  }
  importStudent(students) {
    const param = `${localStorage.getItem('schoolid')}|${localStorage.getItem('username')}`;
    return this.http.post(`${this.servPath}masters/students/import/${param}`, students);
  }
  deleteStudent(id) {
    console.log('service delete id:',id);
    const param = `${id}|${localStorage.getItem('username')}|${localStorage.getItem('schoolid')}`;
    return this.http.get(`${this.servPath}masters/students/delete/${param}`);
  }
  ////// Teacher
  getTeachers() {
    return this.http.get<any>(`${this.servPath}masters/teachers/${localStorage.getItem('schoolid')}`);
  }
  getTeachersBySection(id) {
    return this.http.get<any>(`${this.servPath}masters/getTeachersBySection/${id}|${localStorage.getItem('schoolid')}`);
  }
  getTeachersBySectionPhoto(id) {
    return this.http.get<any>(`${this.servPath}masters/getTeachersBySectionPhoto/${id}|${localStorage.getItem('schoolid')}`);
  }
  getTeachersByUser(userid) {
    console.log('getTeachersByUser   ' +  userid);
    return this.http.get<any>(`${this.servPath}masters/teachersByUser/${userid}`);
  }
  getTeacherById(id) {
    // console.log('service id is :' + id);
    return this.http.get<any>(`${this.servPath}masters/teachersById/${id}`);
    // return this.http.get(`${this.uri}/issues/${id}`);
  }
  updateTeacher(id, teacher) {
    console.log(teacher);
    return this.http.post(`${this.servPath}masters/teachers/update/${id}`, teacher);
  }
  updateSchool(id, school) {
    console.log(school);
    return this.http.post(`${this.servPath}masters/school/update/${id}`, school);
  }
  updateNotice(id, notice) {
    return this.http.post(`${this.servPath}masters/notice/update/${id}`, notice);
  }

  getStudentsByClassForTask(opt) {
    return this.http.get<any>(`${this.servPath}masters/studentsByClassForTask/${opt}`);
  }


  addRelegion(r) {// testing
    return this.http.post(`${this.servPath}masters/religion`, r);
  }
  deleteTeacher(id) {
    console.log('service delete id:', id);
    const param = `${id}|${localStorage.getItem('username')}|${localStorage.getItem('schoolid')}`;
    return this.http.get(`${this.servPath}masters/teachers/delete/${param}`);
  }
  getUserByMobile(mobile) {
    return this.http.get<any>(`${this.servPath}masters/getUserByMobile/${localStorage.getItem('schoolid')}|${mobile}`);
  }
  getUsers() {
    return this.http.get<any>(`${this.servPath}masters/users/${localStorage.getItem('schoolid')}`);
  }
  getUserById(id) {
    console.log(`${this.servPath}api/getUser/${id}`);
    return this.http.get<any>(`${this.servPath}masters/getUser/${id}`);
  }
  getGender() {
    return this.http.get<any>(`${this.servPath}masters/genders`);
  }
  getClasses() {
    console.log(`api :  ${this.servPath}masters/classes`);
    return this.http.get<any>(`${this.servPath}masters/classes/${localStorage.getItem('schoolid')}`);
  }
  getclassesWithDiv(id) {
    return this.http.get<any>(`${this.servPath}masters/classesWithDiv/${id}`);
  }
  getClassesByTeacher(teacher) {
    console.log(teacher);
    return this.http.get<any>(`${this.servPath}masters/classes/${teacher}`);
  }
  getReligions() {
    return this.http.get<any>(`${this.servPath}masters/religions`);
  }
  getCastes() {
    return this.http.get<any>(`${this.servPath}masters/castes`);
  }
  getPhoneBook() {
    return this.http.get<any>(`${this.servPath}masters/phoneBook`);
  }
  getSubjects() {
    return this.http.get<any>(`${this.servPath}masters/subjects/${localStorage.getItem('schoolid')}`);
  }
  getSubjectsByTeacher(teacher) {
    console.log(teacher);
    return this.http.get<any>(`${this.servPath}masters/subjects/${teacher}`);
  }
  getPeriod() {
    return this.http.get<any>(`${this.servPath}masters/periods/${localStorage.getItem('schoolid')}`);
  }
  getAcademicYears() {
    return this.http.get<any>(`${this.servPath}masters/academics/${localStorage.getItem('schoolid')}`);
  }
  getExams() {
    return this.http.get<any>(`${this.servPath}masters/exams/${localStorage.getItem('schoolid')}`);
  }
  getMastersForAttendance(user) {
    return this.http.get<any>(`${this.servPath}masters/mastersForAttendance/${user}|${localStorage.getItem('schoolid')}`);
  }

  getMastersForMark(user) {
    return this.http.get<any>(`${this.servPath}masters/mastersForMark/${user}|${localStorage.getItem('schoolid')}`);
  }
  getMastersForTeacherEntry() {
    return this.http.get<any>(`${this.servPath}masters/mastersForTeacherEntry/${localStorage.getItem('schoolid')}`);
  }
  getNotice(id) {
    console.log('Notice:' + id);
    return this.http.get<any>(`${this.servPath}masters/getNotice/${id}|${localStorage.getItem('schoolid')}`);
  }
  getNotices(id) {
     console.log('Notice:' + id);
    return this.http.get<any>(`${this.servPath}masters/getNotices/${localStorage.getItem('schoolid')}`);
  }
  getSections() {
   return this.http.get<any>(`${this.servPath}masters/getSections`);
 }
  getstudentsCountByClass(id) {
    console.log('NostudentsCountByClasstice:' + id);
   return this.http.get<any>(`${this.servPath}masters/studentsCountByClass/${id}|${localStorage.getItem('schoolid')}`);
 }
  getMastersForTeacherAttendance() {
    return this.http.get<any>(`${this.servPath}masters/mastersForTeachersAttendance/${localStorage.getItem('schoolid')}`);
  }
  getMastersForTeacherAttendanceReport() {
    return this.http.get<any>(`${this.servPath}masters/mastersForTeacherAttendanceReport`);
  }
  getCountries() {
    return this.http.get<any>(`${this.servPath}masters/getCountries`);
  }
  sendSMS1(data){
    return this.http.post(`${this.servPath}messageroutes/sendSMS1`, data);
  }
  sendSMS(data){
    return this.http.post(`${this.servPath}messageroutes/sendSMS`, data);
  }
  getSchoolAndUser(p){
    console.log(p);
    return this.http.get<any>(`${this.servPath}masters/getSchoolAndUser/${p}`);
  }
  schoolRegistration(data) {
    // const param = `${localStorage.getItem('schoolid')}|${localStorage.getItem('username')}`;
    return this.http.post(`${this.servPath}schooldata/schoolRegistrationschool`, data);
  }
  uploadTeacherPhoto(id, fd) {
    console.log(fd);
    return this.http.post(`${this.servPath}masters/uploadTeacherPhoto/${id}`, fd);
  }
  downloadFile(file: String) {
    const body = {filename: file};
    return this.http.post(`${this.servPath}masters/download`, body, {
        responseType : 'blob',
        headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  downloadPhoto(file: String) {
    return this.http.get<any>(`${this.servPath}masters/download/${file}`);
  }
}
