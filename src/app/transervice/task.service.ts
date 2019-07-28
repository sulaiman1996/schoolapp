import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as myGlobals from '../global';
import { Observable } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { catchError } from 'rxjs/operators';
import { error } from 'protractor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  servPath = '';
  taskData: any = {};
  taskType = '';
  constructor(private http: HttpClient) {
    if (environment.debug) {
      this.servPath = environment.serverpath;
    }
  }
  setTaskType(data) {
    this.taskType = data ;
  }
  setTaskData(objname, data) {
    delete this.taskData[objname];
    this.taskData[objname] = data ;
    // console.log(this.taskData);
  }
  closeTask(id, task) {
    return this.http.post(`${this.servPath}taskroutes/task/close/${id}`, task);
  }
  getMastersForTask(user) {
    return this.http.get<any>(`${this.servPath}taskroutes/mastersForTask/${user}|${localStorage.getItem('schoolid')}`);
  }

  getTasks(opt) {
    // console.log('service id is :' + id);
    return this.http.get<any>(`${this.servPath}taskroutes/tasks/${opt}`);
  }
  getStudentsByClassForTask(opt) {
    return this.http.get<any>(`${this.servPath}taskroutes/studentsByClassForTask/${opt}`);
  }
  gettaskroutesForTask(user) {
    return this.http.get<any>(`${this.servPath}taskroutes/mastersForTask/${user}|${localStorage.getItem('schoolid')}`);
  }
  getTaskById(id) {
    // console.log('service id is :' + id);
    return this.http.get<any>(`${this.servPath}taskroutes/taskById/${id}`);
    // return this.http.get(`${this.uri}/issues/${id}`);
  }
  updateTask(id, task) {
    return this.http.post(`${this.servPath}taskroutes/task/update/${id}`, task);
  }
  updateTaskAssign(id, task) {
    return this.http.post(`${this.servPath}taskroutes/taskassign/update/${id}`, task);
  }
  getTaskStatusById(param) {
    return this.http.get<any>(`${this.servPath}taskroutes/getTaskStatusById/${param}`);
  }
  getTaskByTeacherAlert(param) {
    return this.http.get<any>(`${this.servPath}taskroutes/getTaskByTeacherAlert/${param}`);
  }
  getTaskByStudentAlert(param) {
    return this.http.get<any>(`${this.servPath}taskroutes/getTaskByStudentAlert/${param}`);
  }
}
