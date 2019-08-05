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

import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
// import { PhotoUploadComponent } from 'src/app/tools/photo-upload/photo-upload.component';
// import { TeacherAttendanceComponent } from './../../trans/teacher-attendance/teacher-attendance.component';
import { PhotoUploadComponent } from './../../tools/photo-upload/photo-upload.component';

@NgModule({
  declarations: [TeacherListComponent, TeacherDetailComponent, PhotoUploadComponent],
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
      { path: '', component: TeacherListComponent },
      { path: 'attendance',
      loadChildren:
      './../../trans/teacher-attendance/teacher-attendance.module#TeacherAttendanceModule'
      },
     {
      path: ':id',
      component: TeacherDetailComponent,
      // canActivate: [AuthGuardRoles],
      // data: {roles: ['Teacher', 'Admin']}
    },
    ]),
  ],
  providers: [DatePipe],
  entryComponents: [
    PhotoUploadComponent,
  ],
})
export class TeachersModule { }
