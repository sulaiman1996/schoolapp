import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CustomizedCellComponent } from './../../../aggrid/customized-cell/customized-cell.component';
import { MasterService } from './../../../masterservices/master.service';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
// import { of } from 'rxjs/Observable/of';
// import 'rxjs/add/observable/forkJoin';
// import { forkJoin } from 'rxjs';
// import {MatCheckboxModule} from '@angular/material/checkbox';
@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private sortingOrder;
  private frameworkComponents;
  private rowSelection;
  // private getRowClass;
  private rowClassRules;
  // private gridOptions
  constructor(private masterService: MasterService, private snackBar: MatSnackBar, private router: Router) {
    this.columnDefs = [
      {
        headerName: 'No',
        field: 'classNo',
        width: 60,
        sortingOrder: ['asc','desc'],
        rowDrag : true,
        // cellRenderer: 'customizedNoCell'
      },
      {
        headerName: 'Name',
        field: 'name',
        width: 100,
        // editable: true,
        // cellStyle: {color: 'red', 'background-color': 'green'},
        sortingOrder: ['asc','desc'],
        cellStyle: function(params) {
          if (params.value == 'Joe') {
              return {color: 'red', backgroundColor: 'green'};
          } else {
              return null;
          }
        }
      },
      {
        headerName: 'Adm. No',
        field: 'admNo',
        width: 80,
        cellStyle: {color: 'red'},
        editable: true
      },
      {
        headerName: 'Date of Birth',
        field: 'dob',
        width: 100,
        // cellStyle: {color: 'blue'},
        filter: 'agDateColumnFilter',
        cellRenderer: (data) => {
          return data.value ? (new Date(data.value)).toLocaleDateString() : '';
          },
        // filterParams: {
        //   comparator: function(filterLocalDateAtMidnight, cellValue) {
        //     var dateAsString = cellValue;
        //     var dateParts = dateAsString.split("/");
        //     var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
        //     if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        //       return 0;
        //     }
        //     if (cellDate < filterLocalDateAtMidnight) {
        //       return -1;
        //     }
        //     if (cellDate > filterLocalDateAtMidnight) {
        //       return 1;
        //     }
        //   }
        // }
      },
      { headerName: 'Actions',
          suppressMenu: true,
          suppressSorting: true,

          template:
            `<button mat-button color="primary" data-action-type="view" >Edit</button>
            <button mat-button color="warn" data-action-type="remove" >Delete</button>
            `
        }
    ]
    this.sortingOrder = ['asc', 'desc', 'null']
    // this.frameworkComponents = {// add this for CustomizedCellComponent
    //   customizedNoCell: CustomizedCellComponent
    // }
    this.rowSelection = 'multiple';
    // this.gridApi.rowStyle = {background: 'black'};
    
  }

  editStudent(id) {
    // this.snackBar.open('View action clicked-click', 'OK', {
    //   duration: 3000
    // });
    // console.log('edit-id:  ' + id);
    this.router.navigate([`/studentdetail/${id}`]);

  }
  delete(student: any, selectedData: any): void {
    console.log('delete :' + student._id);
    // let selectedData = this.gridApi.getSelectedRows();
    // console.log('delete ::' + selectedData);
    this.masterService.deleteStudent(student._id).subscribe((dd) => {
      // let selectedRowData = this.gridApi.getSelectedRows();

      // const deleteSubscriptions = selectedRowData.map((row) => {
      //   // return console.log(row);
      //   var index = row.rowIndex;
      //   // this.gridApi.data.remo
      // });
      
      // var selectedData = this.gridApi.getSelectedRows();
      var res = this.gridApi.updateRowData({ remove: selectedData });

      this.snackBar.open(`Student: ${student.name}  deleted successfully`, 'OK', {
        duration: 3000
      });
      // console.log(dd);
    });
  }
  onRowClicked(e) {
    if (e.event.target !== undefined) {
        let data = e.data;
        let actionType = e.event.target.getAttribute("data-action-type");

        switch(actionType) {
            case 'view':
                return this.onActionViewClick(data);
            case 'remove':
                return this.onActionRemoveClick(data);
        }
    }
  }

   onActionViewClick(data: any){
    // this.snackBar.open('View action clicked', 'OK', {
    //   duration: 3000
    // });
    console.log('View action clicked', data);
    this.editStudent(data._id)
    // this.router.navigate([`/studentdetail/${data._id}`]);
   }

   onActionRemoveClick(data: any){
    console.log('clik:',data._id)
    var selectedData = this.gridApi.getSelectedRows();
    this.delete(data, selectedData);
  }
  ngOnInit() {
  }
  getRow(){
    var rowNode = this.gridApi.getDisplayedRowAtIndex(0);
    var selectedRowData = this.gridApi.getSelectedRows();
    // console.log(selectedRowData.data);
    const deleteSubscriptions = selectedRowData.map((row) => {
      return console.log(row);
    });
    console.log(deleteSubscriptions.data);
    // alert(selectedRowData.data.name);
  }
  
  onGridReady(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // const dataValue = [{'firstName':'sulaiman','age':52},{'firstName':'Qaueed','age':22}];
    this.gridApi.rowClass = 'sick-days-warnin';
    this.masterService.getStudents()
    .subscribe(
      (data) => {
          console.log(data);
          params.api.setRowData(data);
        }
      )
    
  }
  onCellValueChanged(params: any) {
    console.log(params.data);
  }
  rowsSelected() {
    return this.gridApi && this.gridApi.getSelectedRows().length > 0;
}
}

