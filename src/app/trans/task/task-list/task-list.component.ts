import { TaskService } from './../../../transervice/task.service';
import { Component, OnInit } from '@angular/core';
import { MasterService } from './../../../masterservices/master.service';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconRegistry} from '@angular/material';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = [ 'name', 'start', 'end1', 'menu'];
  form: FormGroup;
  dataSource: any;
  tableData = [];
  type = '';
  selectedType: any = {};
  constructor(private masterService: MasterService, private taskService: TaskService,
    private fb: FormBuilder,
    private location: Location, private router: Router, iconRegistry: MatIconRegistry,
     sanitizer: DomSanitizer,private route: ActivatedRoute,  private snackBar: MatSnackBar) {
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
    // this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.type = params.type;
      this.fillData(false);
    });
  }
  fillData(all) {
    this.taskService.getTasks(`${localStorage.getItem('userid')}|${localStorage.getItem('schoolid')}|${this.type}|${all}`)
    .subscribe(
      res => {
        this.tableData = res.tasks;
        this.selectedType = res.type;
        this.dataSource = new MatTableDataSource(this.tableData);
      }
    );
  }
  add() {
    this.taskService.taskData.task = null;
    this.router.navigate([`/task/${this.type}/__new`]);
  }
  edit(event, item) {
    console.log(item);
    this.taskService.taskData.task = null;
    this.router.navigate([`/task/${this.type}/${item._id}`]);
  }
  navigateBack() {
    // this.location.back();
    this.router.navigate([`/task-dashboard`]);
  }

  status(event, item) {
    this.router.navigate([`/task-status/${this.selectedType.name}-${item.name}|${item._id}`]);
  }
  closeTask(event, item){
      this.taskService.closeTask(`${item._id}|${localStorage.getItem('username')}|${localStorage.getItem('schoolid')}`,
      item).subscribe((res) => {
          this.snackBar.open(`Task ${res['message']}`, 'OK', {
            duration: 3000
          });
          item.closed =  !item.closed;
        }, (err) => {
          console.log(err);
          this.snackBar.open(err.error, 'OK', {
            duration: 3000
          });
      });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  showAll(){
    this.fillData(true);
  }
}
