import { CustomcellComponent } from './../customcell/customcell.component';
import { MasterService } from './../../masterservices/master.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
// import { GridOptions } from 'ag-grid';
@Component({
  selector: 'app-testaggrid',
  templateUrl: './testaggrid.component.html',
  styleUrls: ['./testaggrid.component.css']
})
export class TestaggridComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;

  gridApi: any;
  columnApi: any;
  gridOptions: any;
  // private rowSelection = 'multiple';
  constructor(private masterService: MasterService) { 
    // this.gridOptions = {
    //   context: {
    //     componentParent: this
    //   }
    // }
  }
  columnDefs = [
    {headerName: 'Name', field: 'name', cellRendererFramework: CustomcellComponent, pinned: 'left'},
    {headerName: 'Mobile', field: 'mobile'},
    {headerName: 'State', field: 'state'},
  ];
  rows = [
    {name: 'Sulaiman', mobile: '9747077122', state: 'Kerala'},
    {name: 'Ayyappan', mobile: '1223344444', state: 'TN'},
    {name: 'Hawas', mobile: '3443443444', state: 'Kerala'},
   
  ]
  ngOnInit() {
  }
  onGridReady(param){
    this.gridApi = param.api;
    this.columnApi = param.columnApi;
    // let idSequence = 0;
    // this.gridApi.forEachNode( function(rowNode, index) {
    //   rowNode.id = idSequence++;
    // });
  }
  updateRow(){
    var rowNode = this.gridApi.getRowNode(1);
    rowNode.setData(
      {name: 'Ayyappan', mobile: '1223344444', state: 'TN'}
    );
  }
  updateCell(){
    var rowNode = this.gridApi.getRowNode(1); 
    rowNode.setDataValue("mobile","0000000000");
  }
  updateAllRow(){
    this.masterService.getPhoneBook()
    .subscribe(
      (data) => {
          // console.log(data);
          this.gridApi.setRowData([]);
          // var newData = data;
          this.gridApi.updateRowData({add: data});
        }
      )
  }
  clear() {
    this.gridApi.setRowData([]);
  }
  delete() {
    // let selectedData = this.gridApi.getSelectedRows();
    // let res = this.gridApi.updateRowData({ remove: selectedData });
    // console.log(res);
    // var selectedNodes = this.gridOptions.api.getSelectedNodes();
    // this.gridOptions.api.removeItems(selectedNodes);
    // var selected = this.gridApi.getFocusedCell();
    // selected.splice(selected.rowIndex, 1);
    // this.gridApi.setRowData(this.gridApi.rowData);

    // var res = this.gridApi.updateRowData({ add: {name: 'Sali', mobile: '90000000', state: 'UP'} });
    // const selectedNodes = this.agGrid.api.getSelectedNodes();
    //     const selectedData = selectedNodes.map( node => node.data );
    //     const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
    //     alert(`Selected nodes: ${selectedDataStringPresentation}`);

    var selectedData = this.gridApi.getSelectedRows();
    console.log(selectedData);
    var res = this.gridApi.updateRowData({ remove: selectedData });
    
  }
}
