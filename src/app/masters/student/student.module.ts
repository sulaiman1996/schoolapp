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

import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
// import { MatButtonToggleModule} from '@angular/material/button-toggle';
@NgModule({
  declarations: [StudentListComponent, StudentDetailComponent],
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
    // MatNativeDateModule,
    MatCheckboxModule,
    MatDialogModule,
    // MatButtonToggleModule,
    MatGridListModule,
    MatMenuModule,
    RouterModule,
    RouterModule.forChild([
      { path: '', component: StudentListComponent },
      { path: 'attendance',
      loadChildren:
      './../../trans/att/attendance.module#AttendanceModule'
      },
      {
      path: ':id',
      component: StudentDetailComponent,
      // canActivate: [AuthGuardRoles],
      // data: {roles: ['Teacher', 'Admin']}
      },
    ]),
  ],
  providers: [DatePipe],
})
export class StudentModule { }
