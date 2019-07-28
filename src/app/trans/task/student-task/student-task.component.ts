import { TaskService } from './../../../transervice/task.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDatepickerInputEvent, MatTableDataSource } from '@angular/material';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-task',
  templateUrl: './student-task.component.html',
  styleUrls: ['./student-task.component.css']
})
export class StudentTaskComponent implements OnInit {
  students = [];
  id = '';
  selAll = true;
  displayedColumns: string[] = [ 'classNo', 'name', 'className', 'assigned'];
  dataSource: any;
  searchString = '';
  saved = false ;
  type = '';

  constructor( private taskService: TaskService, private router: Router,
    private route: ActivatedRoute, private snackBar: MatSnackBar, private location: Location) {
  }
  ngOnInit() {
    // console.log(this.taskService.taskData.task.myClasses);
    this.type = this.taskService.taskType;
    this.studentList();
  }
  studentList() {
    const classArray = [];
    this.taskService.taskData.task.myClasses.forEach(element => {
      classArray.push(element._id);
    });
    // console.log(classArray);
    // console.log(this.taskService.taskData.task._id);
    this.id = (this.taskService.taskData.task._id) ? this.taskService.taskData.task._id : '__new';
    const param = `${localStorage.getItem('schoolid')}|${classArray}|${this.id}`;
    // console.log(param);
    this.taskService.getStudentsByClassForTask(param)
        .subscribe(
          (res) => {
              this.students = res;
              // console.log(res);
              this.students.forEach(element => {
                // console.log(element.task);
                element['finished'] = element.finished;
                element['className'] = element.class.name;
                element['myClass'] = element.class._id;
                element['myTask'] =  this.taskService.taskData.task._id;
                element['assigned'] = this.id === '__new';
                element['action'] = 'Y'; // new
                element['status'] = 'N'; // new
                if (element.task) {
                  element['status'] = 'A'; // assigned
                  element['assigned'] = true;
                  element['to'] = element.task.to;
                  element['taskAssignedId'] = element.task._id;
                  if (element.task.finishedon) {
                    element['status'] = 'C'; // closed
                    element['action'] = 'N';
                  }
                }
                // console.log(element);
              });
              this.dataSource = new MatTableDataSource(this.students);
              // console.log(this.students);
          },
          err => {
            console.log(err.error);
          }
        );
  }
  onChangeCheckBox(event, index, item) {
    item.assigned = !item.assigned;
    // console.log(item);
    // console.log(index);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  selectAll(b) {
    this.students.forEach(element => {
      element['assigned'] = b;
    });
    this.dataSource = new MatTableDataSource(this.students);
    this.selAll = !this.selAll;
    this.searchString = '';
  }
  navigateBack() {
    this.location.back();
  }
  update() {
    const deleteStudent = [];
    const saveStudent = [];
    this.students.forEach(element => {
      switch (element['status']) {
        case 'C': break;
        case 'A': element['action'] = element['assigned'] ? 'N' : 'D';
                  break;
        case 'N': element['action'] = element['assigned'] ? 'S' : 'N';
                  break;
      }
      if (element['action'] === 'D') {
        deleteStudent.push(element['taskAssignedId']);
      }
      if (element['action'] === 'S') {
        saveStudent.push({_id : element['_id'], myTask : element['myTask'],
        myClass : element['myClass']});
      }
    });
    // const saveStudent = this.students.filter(x => x.action === 'S');

    const saveData = {task: this.taskService.taskData.task, saveStudent: saveStudent, deleteStudent: deleteStudent};
    // console.log(saveData);

    this.taskService.updateTask(`${this.id}|${localStorage.getItem('username')}|${localStorage.getItem('schoolid')}`,
    saveData).subscribe((res) => {
        const resultOkMessage = `assigned to ${res['students']['nInserted']} students`;
        const writeConcernErrors = res['students']['writeConcernErrors'];
        const writeErrors = res['students']['writeErrors'];
        const removedNos = res['removed']['n'];
        let removed = '';
        if (removedNos > 0) {
          removed = `and removed ${res['removed']['n']} students`;
        }
        const taskMessage = res['task']['message'];
        this.saved = true;
        let i = 0 ;
        const insertedIds = res['students']['insertedIds'];
        // console.log(insertedIds);
        this.students.forEach(element => {
          if (element['action'] === 'S') {
            element['taskAssignedId'] = insertedIds[i++];
          }
          if (element['assigned']) {
            if (element['status'] !== 'C') {
              element['status'] = 'A';
            }
            element['action'] = 'N';
          } else {
            element['status'] = 'N';
            element['action'] = 'N';
          }
        });
        this.taskService.taskData.task = null;
        this.snackBar.open(`Task ${taskMessage}, ${resultOkMessage}  ${removed}`, 'OK', {
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
