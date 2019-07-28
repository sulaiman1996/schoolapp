import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from '../global';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarksentryService {
  servPath = '';
  constructor(private http: HttpClient) {
    // if (myGlobals.debugApp) {
    //   this.servPath = myGlobals.serverpath;
    // }
    if (environment.debug) {
      this.servPath = environment.serverpath;
    }
  }
  getMarksByAcademicYearOfStudent(param) {
    console.log(param);
    if (param) {
      return this.http.get<any>(`${this.servPath}marksroutes/getMarksByAcademicYearOfStudent/${param}`);
    }
  }
  getStudentMarks(param) {
    if (param) {
      // console.log('service: ' + param);
      return this.http.get<any>(`${this.servPath}marksroutes/studentmarks/${param}`);
    }
  }
  updateMarks(id, att) {
    console.log('service: ' + att);
    console.log(this.servPath);
    if (att) {
      return this.http.post(`${this.servPath}marksroutes/marks/update/${id}`, att);
    }
  }
}
