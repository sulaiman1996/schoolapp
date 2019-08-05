import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule, MatInputModule, MatOptionModule,
    MatSelectModule, MatButtonModule, MatTableModule, MatDividerModule,
    MatSnackBarModule, MatDialogModule,
    //  MatDatepickerModule, 
    // MatToolbarModule, MatIconModule, MatCardModule,
    // MatPaginatorModule, MatNativeDateModule , MatMenuModule,
    MatGridListModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { AttendanceProgressComponent } from './attendance-progress.component';
import { AttendanceSummaryComponent } from '../attendance-summary/attendance-summary.component';

@NgModule({
  declarations: [AttendanceProgressComponent, AttendanceSummaryComponent],
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
    MatDividerModule,
    MatSnackBarModule,
    // MatPaginatorModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatCheckboxModule,
    MatDialogModule,
    // MatButtonToggleModule,
    MatGridListModule,
    // MatMenuModule,

    ChartsModule,
    RouterModule.forChild([
      { path: '', component: AttendanceProgressComponent }
    ]),
  ],
  entryComponents: [
    AttendanceSummaryComponent,
  ],
})
export class AttendanceProgressModule { }
