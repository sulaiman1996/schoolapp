import { CustomizedCellComponent } from './../aggrid/customized-cell/customized-cell.component';
import { MatFormFieldModule } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { MasterService } from '../masterservices/master.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
// import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
@Component({
  selector: 'app-aggridtest',
  templateUrl: './aggridtest.component.html',
  styleUrls: ['./aggridtest.component.css']
})
export class AggridtestComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private sortingOrder;
  private frameworkComponents;

  constructor(private masterService: MasterService, private snackBar: MatSnackBar, private router: Router) {
    this.columnDefs = [
      {
        headerName: 'No',
        field: 'classNo',
        width: 60,
        sortingOrder: ['asc','desc'],
        rowDrag : true,
        cellRenderer: 'customizedNoCell'
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
        cellStyle: {color: 'red'}
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
        filterParams: {
          comparator: function(filterLocalDateAtMidnight, cellValue) {
            var dateAsString = cellValue;
            var dateParts = dateAsString.split("/");
            var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
            if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
              return 0;
            }
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            }
            if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            }
          }
        }
      },
      { headerName: 'Actions',
          suppressMenu: true,
          suppressSorting: true,

          template:
            // `<button type="button" data-action-type="view" class="btn btn-default">
            //    View
            //  </button>

            // <button type="button" data-action-type="remove" class="btn btn-default">
            //    Remove
            // </button>`
            `<button mat-button color="primary" data-action-type="view" >Edit</button>
            <button mat-button color="warn" data-action-type="remove" >Delete</button>
            `
        }
    ]
    this.sortingOrder = ['asc', 'desc', 'null']
    this.frameworkComponents = {
      customizedNoCell: CustomizedCellComponent
    }
  }

  editStudent(id) {
    // this.snackBar.open('View action clicked-click', 'OK', {
    //   duration: 3000
    // });
    // console.log('edit-id:  ' + id);
    this.router.navigate([`/studentdetail/${id}`]);

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
    this.snackBar.open('Remove action clicked', 'OK', {
      duration: 3000
    });
      console.log('Remove action clicked', data);
  }
  ngOnInit() {
  }
  getRow(){
    var rowNode = this.gridApi.getDisplayedRowAtIndex(0);
    alert(rowNode.data.name);
  }
  
  onGridReady(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // const dataValue = [{'firstName':'sulaiman','age':52},{'firstName':'Qaueed','age':22}];

    this.masterService.getStudents()
    .subscribe(
      (data) => {
          params.api.setRowData(data);
        }
      )
  }
}
