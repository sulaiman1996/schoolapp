
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthService } from './auth/service/auth.service';
import { EventService } from './event.service';
import { MasterService } from './masterservices/master.service';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from './auth/service/auth.guard';
import { AuthGuardRoles } from './auth/service/auth.guard.roles';
import { TokenInterceptorService } from './auth/service/token-interceptor.service';
import { AgGridModule } from 'ag-grid-angular';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { DivisionComponent } from './masters/divisions/division/division.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule,
  MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule,
  MatSnackBarModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule , MatDialogModule,
  MatGridListModule, MatMenuModule } from '@angular/material';
import { StudentComponent } from './masters/student/student/student.component';
import { AggridtestComponent } from './aggridtest/aggridtest.component';
// import { AgGridModule } from 'ag-grid-angular/main';
import { CustomizedCellComponent } from './aggrid/customized-cell/customized-cell.component';
import { StudentDetailComponent } from './masters/student/student-detail/student-detail.component';
import { StudentlistComponent } from './masters/student/studentlist/studentlist.component';
import { TestaggridComponent } from './aggrid/testaggrid/testaggrid.component';
import { CustomcellComponent } from './aggrid/customcell/customcell.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RegisterUserComponent } from './auth/register-user/register-user.component';
import { LoginUserComponent } from './auth/login-user/login-user.component';
import { SelectorComponent } from './tools/selector/selector.component';
import { MastersComponent } from './masters/masters/masters/masters.component';
import { MasterComponent } from './masters/masters/master/master.component';
import { MastereditComponent } from './masters/masters/masteredit/masteredit.component';
import { TeacherDetailComponent } from './masters/teacher/teacher-detail/teacher-detail.component';
import { AttendanceComponent } from './trans/att/attendance/attendance.component';
import { MarksentryComponent } from './trans/marks/marksentry/marksentry.component';
import { TimesheetSummaryDialogComponent } from './trans/att/timesheet-summary-dialog/timesheet-summary-dialog.component';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { DatePipe } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { ProgressComponent } from './report/progress/progress.component';
import { CharttestComponent } from './report/charttest/charttest.component';
import { StudentListComponent } from './masters/student/student-list/student-list.component';
import { AttendanceProgressComponent } from './report/attendance-progress/attendance-progress.component';
import { AttendanceSummaryComponent } from './report/attendance-summary/attendance-summary.component';
import { MarkProgressComponent } from './report/mark-progress/mark-progress.component';
import { MarkProgress1Component } from './report/mark-progress1/mark-progress1.component';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { NoticeComponent } from './trans/notices/notice/notice.component';
import { NoticeListComponent } from './trans/notices/notice-list/notice-list.component';
import { AboutComponent } from './common/about/about.component';
import { StudentCategoryComponent } from './report/student-category/student-category.component';
import { ReportDashboardComponent } from './report/report-dashboard/report-dashboard.component';
import { AlertsComponent } from './trans/alerts/alerts.component';
import { ProgressPrintComponent } from './report/progress-print/progress-print.component';
import { AttendanceTakenComponent } from './report/attendance-taken/attendance-taken.component';
import { TeacherAttendanceComponent } from './trans/teacher-attendance/teacher-attendance.component';
import { AttendanceTeachersComponent } from './report/attendance-teachers/attendance-teachers.component';
import { TeacherListComponent } from './masters/teacher/teacher-list/teacher-list.component';
import { TeacherlistComponent } from './masters/teacher/teacherlist/teacherlist.component';
import { ImportStudentComponent } from './masters/student/import-student/import-student.component';
import { MsterCreateComponent } from './masters/school/mster-create/mster-create.component';
import { SchoolMasterComponent } from './masters/school/school-master/school-master.component';
import { SchoolClassComponent } from './masters/school/school-class/school-class.component';
import { SchoolPeriodComponent } from './masters/school/school-period/school-period.component';
import { SchoolSubjectComponent } from './masters/school/school-subject/school-subject.component';
import { SchoolExamComponent } from './masters/school/school-exam/school-exam.component';
import { TaskComponent } from './trans/task/task/task/task.component';
import { TaskListComponent } from './trans/task/task-list/task-list.component';
import { StudentTaskComponent } from './trans/task/student-task/student-task.component';
import { TaskDashboardComponent } from './trans/task/task-dashboard/task-dashboard.component';
import { TaskStatusComponent } from './trans/task/task-status/task-status.component';
import { TaskAssignComponent } from './trans/task/task-assign/task-assign.component';
import { PhotoUploadComponent } from './tools/photo-upload/photo-upload.component';
import { ContactsComponent } from './common/contacts/contacts.component';
import { TaskReportComponent } from './report/task-report/task-report.component';
// import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle} from '@angular/cdk/drag-drop';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    DivisionComponent,
    StudentComponent,
    AggridtestComponent,
    CustomizedCellComponent,
    StudentDetailComponent,
    StudentlistComponent,
    TestaggridComponent,
    CustomcellComponent,
    RegisterUserComponent,
    LoginUserComponent,
    SelectorComponent,
    MastersComponent,
    MasterComponent,
    MastereditComponent,
    TeacherlistComponent,
    TeacherDetailComponent,
    AttendanceComponent,
    MarksentryComponent,
    TimesheetSummaryDialogComponent,
    DashboardComponent,
    ProgressComponent,
    CharttestComponent,
    StudentListComponent,
    AttendanceProgressComponent,
    AttendanceSummaryComponent,
    MarkProgressComponent,
    MarkProgress1Component,
    NoticeComponent,
    NoticeListComponent,
    AboutComponent,
    StudentCategoryComponent,
    ReportDashboardComponent,
    AlertsComponent,
    ProgressPrintComponent,
    AttendanceTakenComponent,
    TeacherAttendanceComponent,
    AttendanceTeachersComponent,
    TeacherListComponent,
    ImportStudentComponent,
    MsterCreateComponent,
    SchoolMasterComponent,
    SchoolClassComponent,
    SchoolPeriodComponent,
    SchoolSubjectComponent,
    SchoolExamComponent,
    TaskComponent,
    TaskListComponent,
    StudentTaskComponent,
    TaskDashboardComponent,
    TaskStatusComponent,
    TaskAssignComponent,
    PhotoUploadComponent,
    ContactsComponent,
    TaskReportComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
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
    MatButtonToggleModule,
    MatGridListModule,
    MatMenuModule,
    BrowserAnimationsModule, ChartsModule,
    AgGridModule.withComponents([CustomizedCellComponent]),
    DeviceDetectorModule.forRoot()
  ],
  providers: [AuthService, AuthGuard, AuthGuardRoles, EventService,
    MasterService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }, DatePipe],
  entryComponents: [
    CustomcellComponent,
    TimesheetSummaryDialogComponent,
    AttendanceSummaryComponent,
    TaskAssignComponent,
    PhotoUploadComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
