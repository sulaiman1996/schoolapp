import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-customized-cell',
  templateUrl: './customized-cell.component.html',
  styleUrls: ['./customized-cell.component.css']
})
export class CustomizedCellComponent implements OnInit, ICellRendererAngularComp {
  private cellvalue: any;
  constructor() { }

  ngOnInit() {
  }
  agInit(params: any){
    this.cellvalue = params.value;
  }
  refresh(params: any): boolean {
    this.cellvalue = params.value;
    return true;
  }
}
