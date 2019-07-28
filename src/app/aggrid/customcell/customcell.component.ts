import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customcell',
  templateUrl: './customcell.component.html',
  styleUrls: ['./customcell.component.css']
})
export class CustomcellComponent implements OnInit {
  data: any;
  param: any;
  
  constructor() { }
  agInit(param) {
    this.param = param;
    this.data = param.value;
  }
  ngOnInit() {
  }
  excecute() {
    // console.log(this.param.data);
    // this.param.context.componentParent.updateAllRow();
  }
}
