
import { AuthGuard } from './auth/service/auth.guard';
import { AuthGuardRoles } from './auth/service/auth.guard.roles';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginUserComponent } from './auth/login-user/login-user.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: './common/dashboard/dashboard.module#DashboardModule',
    // component: DashboardComponent,
    canActivate: [AuthGuard]

    // canActivate: [AuthGuardRoles],
    // data: {roles: ['Admin', 'Teacher', 'Parent', 'PTA']}
  },
  {
    path: 'login',
    loadChildren: './auth/login-user/login-user.module#LoginUserModule',
    // component: LoginUserComponent
  },
  {
    path: 'attendance',
    loadChildren: './trans/att/attendance.module#AttendanceModule',
    canActivate: [AuthGuardRoles],
    data: {roles: ['Teacher']}
  },
  {
    path: 'marksEntry',
    loadChildren: './trans/marks/markentry.module#MarkentryModule',
    canActivate: [AuthGuardRoles],
    data: {roles: ['Teacher']}
  },
  {
    path: 'teachers',
    loadChildren: './masters/teacher/teachers.module#TeachersModule',
    canActivate: [AuthGuardRoles],
    data: {roles: ['Teacher', 'Admin']}
  },
  {
    path: 'students',
    loadChildren: './masters/student/student.module#StudentModule',
    canActivate: [AuthGuardRoles],
    data: {roles: ['Teacher', 'Admin', 'PTA']}
  },
  {
    path: 'import-students',
    loadChildren: './masters/student/import-student/import-student.module#ImportStudentModule',
    canActivate: [AuthGuardRoles],
    data: {roles: ['Teacher', 'Admin']}
  },
  {
    path: 'selector',
    loadChildren: './tools/selector/selector.module#SelectorModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: './auth/register-user/register.module#RegisterModule',
    canActivate: [AuthGuardRoles],
    data: {roles: ['Teacher', 'Admin']}
  },
  {
    path: 'attendanceProgress/:id',
    loadChildren: './report/attendance-progress/attendance-progress.module#AttendanceProgressModule',
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'Parent', 'PTA']}
  },
  {
    path: 'attendanceProgress/:id',
    loadChildren: './report/attendance-progress/attendance-progress.module#AttendanceProgressModule',
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'Parent', 'PTA']}
  },
  {
    path: 'report',
    loadChildren: './report/report-dashboard/report-dashboard.module#ReportDashboardModule',
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'PTA']}
  },
  {
    path: 'attendance-taken',
    loadChildren: './report/attendance-taken/attendance-taken.module#AttendanceTakenModule',
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'PTA']}
  },
  {
    path: 'attendance-teacher-report',
    loadChildren: './report/attendance-teachers/attendance-teachers.module#AttendanceTeacherReportModule',
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin']}
  },
  {
    path: 'markProgress/:id',
    // component: MarkProgressModule,
    loadChildren: './report/mark-progress/mark-progress.module#MarkProgressModule',
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'Parent', 'PTA']}
  },
  {
    path: 'markProgressSummary/:id',
    loadChildren: './report/mark-progress1/mark-progress1.module#MarkProgress1Module',
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'Parent', 'PTA']}
  },
  {
    path: 'report-student-category',
    loadChildren: './report/student-category/student-category.module#StudentCategoryModule',
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'PTA']}
  },
  {
    path: 'task-dashboard',
    loadChildren: './trans/task/task-dashboard/task-dashboard.module#TaskDashboardModule',
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher']}
  },
  {
    path: 'task-report',
    loadChildren: './report/task-report/task-report.module#TaskReportModule',
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'Parent']}
  },
  {
    path: 'noticelist',
    loadChildren: './trans/notices/notice.module#NoticeModule',
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'Parent', 'PTA']}
  },
  {
    path: 'contacts',
    loadChildren: './common/contacts/contacts.module#ContactsModule',
    canActivate: [AuthGuardRoles],
    data: {roles: ['Admin', 'Teacher', 'PTA', 'Parent']}
  },
  {
    path: 'about',
    loadChildren: './common/about/about.module#AboutModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
