import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule, MatInputModule, MatOptionModule,
    MatSelectModule, MatButtonModule, MatTableModule, 
    MatSnackBarModule, MatDatepickerModule,  MatDialogModule,
    MatToolbarModule, MatIconModule, MatCardModule, MatDividerModule,
    MatPaginatorModule, MatNativeDateModule , MatMenuModule,
    MatGridListModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';

// import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { TaskAssignComponent } from './task-assign/task-assign.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task/task.component';
import { StudentTaskComponent } from './student-task/student-task.component';
import { TaskStatusComponent } from './task-status/task-status.component';

@NgModule({
  declarations: [TaskAssignComponent,
    TaskListComponent, TaskComponent, StudentTaskComponent, TaskStatusComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // HttpClientModule,
    // AppRoutingModule,

    // MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDialogModule,
    // MatButtonToggleModule,
    MatGridListModule,
    MatMenuModule,
    RouterModule,
    RouterModule.forChild([
      { path: '', component: TaskListComponent},
      {
        path: 'student-task',
        component: StudentTaskComponent,
        // canActivate: [AuthGuardRoles],
        // data: {roles: ['Teacher', 'Admin']}
      },
      {
        path: ':id',
        component: TaskComponent,
        // canActivate: [AuthGuardRoles],
        // data: {roles: ['Teacher', 'Admin']}student-task
      },
    ]),
  ],
  providers: [DatePipe],
})
export class TaskModule { }
