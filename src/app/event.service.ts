import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from './global';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _eventsUrl = '';
  private _specialEventsUrl = '';
  constructor(private http: HttpClient) { }
  getEvents(){

    return this.http.get<any>(this._eventsUrl);
  }
  getSpecialEvents(){
    return this.http.get<any>(this._specialEventsUrl);
  }
}
