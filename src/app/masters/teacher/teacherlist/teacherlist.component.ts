import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { MasterService } from './../../../masterservices/master.service';
@Component({
  selector: 'app-teacherlist',
  templateUrl: './teacherlist.component.html',
  styleUrls: ['./teacherlist.component.css']
})
export class TeacherlistComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private sortingOrder;


    constructor(private masterService: MasterService, private snackBar: MatSnackBar, private router: Router) {
    this.columnDefs = [
      {
        headerName: 'PEN',
        field: 'PEN',
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
      },
      {
        headerName: 'address',
        field: 'Address',
        width: 100,
        // editable: true,
        // cellStyle: {color: 'red', 'background-color': 'green'},
        sortingOrder: ['asc','desc'],
      },
      {
        headerName: 'Date of Join',
        field: 'dob',
        width: 100,
        // cellStyle: {color: 'blue'},
        filter: 'agDateColumnFilter',
        cellRenderer: (data) => {
          return data.value ? (new Date(data.value)).toLocaleDateString() : '';
          },
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
  }

  ngOnInit() {
  }
  onGridReady(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.rowClass = 'sick-days-warnin';
    this.masterService.getTeachers()
    .subscribe(
      (data) => {
          params.api.setRowData(data);
        }
      )
    }
  onRowClicked(e) {
    if (e.event.target !== undefined) {
        const data = e.data;
        const actionType = e.event.target.getAttribute('data-action-type');

        switch (actionType) {
            case 'view':
                return this.onActionViewClick(data);
            case 'remove':
                return this.onActionRemoveClick(data);
        }
    }
  }
  onActionViewClick(data: any){
    console.log('View action clicked', data);
    this.edit(data._id)
  }
  onActionRemoveClick(data: any){
    console.log('clik:', data._id)
    var selectedData = this.gridApi.getSelectedRows();
    this.delete(data, selectedData);
  }
  edit(id) {
    this.router.navigate([`/teacherdetail/${id}`]);
  }
  delete(student: any, selectedData: any): void {
    this.masterService.deleteTeacher(student._id).subscribe((dd) => {
      let res = this.gridApi.updateRowData({ remove: selectedData });
      this.snackBar.open(`Student: ${student.name}  deleted successfully`, 'OK', {
        duration: 3000
      });
    });
  }
}
