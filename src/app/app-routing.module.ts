import { ContactsComponent } from './common/contacts/contacts.component';
import { TaskStatusComponent } from './trans/task/task-status/task-status.component';
import { MsterCreateComponent } from './masters/school/mster-create/mster-create.component';
import { SchoolExamComponent } from './masters/school/school-exam/school-exam.component';
import { SchoolSubjectComponent } from './masters/school/school-subject/school-subject.component';
import { SchoolPeriodComponent } from './masters/school/school-period/school-period.component';
import { SchoolClassComponent } from './masters/school/school-class/school-class.component';
import { ProgressPrintComponent } from './report/progress-print/progress-print.component';
import { AlertsComponent } from './trans/alerts/alerts.component';
import { AboutComponent } from './common/about/about.component';
import { NoticeComponent } from './trans/notices/notice/notice.component';
import { AttendanceProgressComponent } from './report/attendance-progress/attendance-progress.component';
import { ProgressComponent } from './report/progress/progress.component';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { AttendanceComponent } from './trans/att/attendance/attendance.component';
import { TeacherDetailComponent } from './masters/teacher/teacher-detail/teacher-detail.component';
import { MastereditComponent } from './masters/masters/masteredit/masteredit.component';
import { MastersComponent } from './masters/masters/masters/masters.component';
import { RegisterUserComponent } from './auth/register-user/register-user.component';
import { StudentDetailComponent } from './masters/student/student-detail/student-detail.component';
import { AuthGuard } from './auth/service/auth.guard';
import { AuthGuardRoles } from './auth/service/auth.guard.roles';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DivisionComponent } from './masters/divisions/division/division.component';
import { StudentComponent } from './masters/student/student/student.component';
import { LoginUserComponent } from './auth/login-user/login-user.component';
import { SelectorComponent } from './tools/selector/selector.component';
import { MasterComponent } from './masters/masters/master/master.component';
import { MarksentryComponent } from './trans/marks/marksentry/marksentry.component';
import { CharttestComponent } from './report/charttest/charttest.component';
import { StudentListComponent } from './masters/student/student-list/student-list.component';
import { MarkProgressComponent } from './report/mark-progress/mark-progress.component';
import { MarkProgress1Component } from './report/mark-progress1/mark-progress1.component';
import { NoticeListComponent } from './trans/notices/notice-list/notice-list.component';
import { ReportDashboardComponent } from './report/report-dashboard/report-dashboard.component';
import { StudentCategoryComponent } from './report/student-category/student-category.component';
import { AttendanceTakenComponent } from './report/attendance-taken/attendance-taken.component';
import { TeacherAttendanceComponent } from './trans/teacher-attendance/teacher-attendance.component';
import { AttendanceTeachersComponent } from './report/attendance-teachers/attendance-teachers.component';
import { TeacherListComponent } from './masters/teacher/teacher-list/teacher-list.component';
import { ImportStudentComponent } from './masters/student/import-student/import-student.component';
import { SchoolMasterComponent } from './masters/school/school-master/school-master.component';
import { TaskComponent } from './trans/task/task/task/task.component';
import { TaskListComponent } from './trans/task/task-list/task-list.component';
import { StudentTaskComponent } from './trans/task/student-task/student-task.component';
import { TaskDashboardComponent } from './trans/task/task-dashboard/task-dashboard.component';
import { TaskReportComponent } from './report/task-report/task-report.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginUserComponent
  },
  {
    path: 'register',
    component: RegisterUserComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Teacher', 'Admin']}
  },
  {
    path: 'register/:id',
    component: RegisterUserComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'Parent']}
  },
  {
    path: 'selector',
    component: SelectorComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'students',
    component: StudentListComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Teacher', 'Admin', 'PTA']}
  },
  {
    path: 'teachers',
    component: TeacherListComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Teacher', 'Admin']}
  },
  {
    path: 'teacherdetail/:id',
    component: TeacherDetailComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Teacher', 'Admin']}
  },
  {
    path: 'studentdetail/:id',
    component: StudentDetailComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Teacher', 'Admin', 'PTA']}
  },
  {
    path: 'import-students',
    component: ImportStudentComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Teacher', 'Admin']}
  },
  {
    path: 'masters',
    component: MastersComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher']}
  },
  {
    path: 'division',
    component: DivisionComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin']}
  },
  {
    path: 'master',
    component: MasterComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher']}
  },
  {
    path: 'masteredit',
    component: MastereditComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher']} // 'Teacher' added for debug only. to be remomved.
  },
  {
    path: 'attendance',
    component: AttendanceComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Teacher']}
  },
  // {
  //   path: 'stuedentProgress/:id',
  //   component: ProgressComponent,
  //   canActivate: [AuthGuardRoles],
  //   data: {roles: ['Admin', 'Teacher', 'Parent']}
  // },
  {
    path: 'attendanceProgress/:id',
    component: AttendanceProgressComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'Parent', 'PTA']}
  },
  {
    path: 'markProgress/:id',
    component: MarkProgressComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'Parent', 'PTA']}
  },
  {
    path: 'markProgressSummary/:id',
    component: MarkProgress1Component,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'Parent', 'PTA']}
  },
  {
    path: 'marksEntry',
    component: MarksentryComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Teacher']}
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'Parent', 'PTA']}
  },
  {
    path: 'noticelist',
    component: NoticeListComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'Parent', 'PTA']}
  },
  {
    path: 'notice/:id',
    component: NoticeComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'Parent', 'PTA']}
  },
  {
    path: 'about',
    component: AboutComponent
  },
  //  reports
  {
    path: 'report',
    component: ReportDashboardComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'PTA']}
  },
  {
    path: 'report-student-category',
    component: StudentCategoryComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'PTA']}
  },
  {
    path: 'alerts',
    component: AlertsComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'Parent', 'PTA']}
  },
  {
    path: 'print-progress',
    component: ProgressPrintComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'PTA']}
  },
  {
    path: 'attendance-taken',
    component: AttendanceTakenComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'PTA']}
  },
  {
    path: 'attendance-teacher',
    component: TeacherAttendanceComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher']}
  },
  {
    path: 'attendance-teacher-report',
    component: AttendanceTeachersComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin']}
  },
  {
    path: 'register-school',
    component: SchoolMasterComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin']}
  },
  {
    path: 'school-class',
    component: SchoolClassComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin']}
  },
  {
    path: 'school-period',
    component: SchoolPeriodComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin']}
  },
  {
    path: 'school-subject',
    component: SchoolSubjectComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin']}
  },
  {
    path: 'school-exam',
    component: SchoolExamComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin']}
  },
  {
    path: 'school-finish',
    component: MsterCreateComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin']}
  },
  {
    path: 'tasks/:type',
    component: TaskListComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher']}
  },
  {
    path: 'task/:type/:id',
    component: TaskComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher']}
  },
  {
    path: 'student-task',
    component: StudentTaskComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher']}
  },
  {
    path: 'task-dashboard',
    component: TaskDashboardComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher']}
  },
  {
    path: 'task-status/:id',
    component: TaskStatusComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher']}
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'PTA', 'Parent']}
  },
  {
    path: 'task-report',
    component: TaskReportComponent,
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'Parent']}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
