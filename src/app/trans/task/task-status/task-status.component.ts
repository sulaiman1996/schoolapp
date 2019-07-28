import { TaskService } from './../../../transervice/task.service';
import { Component, OnInit } from '@angular/core';
import { MasterService } from './../../../masterservices/master.service';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconRegistry} from '@angular/material';
import { DomSanitizer} from '@angular/platform-browser';
import { TaskAssignComponent } from '../task-assign/task-assign.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.css']
})
export class TaskStatusComponent implements OnInit {

  displayedColumns: string[] = [ 'classNo', 'name', 'class', 'finished', 'finishedon', 'menu'];
  form: FormGroup;
  dataSource: any;
  tableData = [];
  typeName = '';
  id = '';
  constructor(private masterService: MasterService, private taskService: TaskService,
    private fb: FormBuilder,
    private location: Location, private router: Router, iconRegistry: MatIconRegistry,
     sanitizer: DomSanitizer,private route: ActivatedRoute,  private snackBar: MatSnackBar
     , public dialog: MatDialog, private datePipe: DatePipe) {
      iconRegistry.addSvgIcon(
        'more_vert',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/more_vert.svg'));
      iconRegistry.addSvgIcon(
          'edit',
          sanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit.svg'));
      iconRegistry.addSvgIcon(
        'student',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/student.svg'));
      iconRegistry.addSvgIcon(
        'close',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/close.svg'));
      iconRegistry.addSvgIcon(
        'restore',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/restore.svg'));
      iconRegistry.addSvgIcon(
          'done',
          sanitizer.bypassSecurityTrustResourceUrl('assets/icons/done.svg'));
      iconRegistry.addSvgIcon(
        'undo',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/undo.svg'));
    // this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params.id);
      const paramData = params.id.split('|');
      this.id = paramData[1];
      this.typeName = paramData[0];
      this.fillData(false);
    });
  }
  fillData(all) {
    this.taskService.getTaskStatusById(`Nill|${this.id}|${all}`)
    .subscribe(
      res => {
        this.tableData = res;
        // console.log(this.tableData);
        this.dataSource = new MatTableDataSource(this.tableData);
      }
    );
  }

  edit(event, item) {
    // console.log(item);
    this.openDialog(item);
  }
  navigateBack() {
    this.location.back();
    // this.router.navigate([`/task-dashboard`]);
  }

  done(event, item) {
    item.assign.finished = !item.assign.finished;
    if (item.assign.finished) {
      item.finishedon = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      item.finishedDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    } else {
      item.finishedon = null;
      item.finishedDate = null;
    }
    item.Edited = true;
  }
  closeTask(event, item) {
    item.assign.closed = !item.assign.closed;
    item.Edited = true;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  allDone() {
    this.tableData.forEach(item => {
      item.assign.finished = true;
      item.finishedon = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      item.finishedDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      item.Edited = true;
    });
  }
  openDialog(assign): void {
    const dialogRef = this.dialog.open(TaskAssignComponent, {
      width: '250px',
      disableClose: true,
      autoFocus: true,
      data: { assign: assign,
              message: ''}
    });
    dialogRef.afterClosed().subscribe(saveData => {
      console.log(saveData);
      if (saveData ) {
        // console.log(this.tableData);
      } else {
        console.log('The dialog was closed for not to save');
      }
    });
  }
  updateTaskAssign(){
    const dt = this.tableData.filter(x => x.Edited === true);
    this.taskService.updateTaskAssign(`${this.id}|${localStorage.getItem('username')}|${localStorage.getItem('schoolid')}`,
    dt).subscribe((res) => {
        // console.log(res);
        const resultOkMessage = `${res['nModified']} task assign modified`;
        // const writeConcernErrors = res['writeConcernErrors'];
        // const writeErrors = res['writeErrors'];
        // let removed = '';
        // if (removedNos > 0) {
        //   removed = `and removed ${res['removed']['n']} students`;
        // }

        this.snackBar.open(`${resultOkMessage}`, 'OK', {
          duration: 3000
        });
      }, (err) => {
        console.log(err);
        this.snackBar.open(err.error, 'OK', {
          duration: 3000
        });
    });
  }
}
