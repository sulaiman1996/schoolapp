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

import { AttendanceComponent } from './attendance/attendance.component';
import { TimesheetSummaryDialogComponent } from './timesheet-summary-dialog/timesheet-summary-dialog.component';


@NgModule({
  declarations: [
    AttendanceComponent,
    TimesheetSummaryDialogComponent,
  ],
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
    // MatIconModule,
    MatButtonModule,
    // MatCardModule,
    MatTableModule,
    // MatDividerModule,
    MatSnackBarModule,
    // MatPaginatorModule,
    MatDatepickerModule,
    // MatNativeDateModule,
    MatCheckboxModule,
    MatDialogModule,
    // MatButtonToggleModule,
    MatGridListModule,
    // MatMenuModule,
    RouterModule.forChild([
      { path: '', component: AttendanceComponent }
    ]),
  ],
  providers: [DatePipe],
  entryComponents: [
    TimesheetSummaryDialogComponent,
  ],
})
export class AttendanceModule {
  // constructor(){
  //   console.log('Attendance module')
  // };
 }

