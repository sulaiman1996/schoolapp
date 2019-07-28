import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StudentsData } from '../attendance/attendance.component';

@Component({
  selector: 'app-timesheet-summary-dialog',
  templateUrl: './timesheet-summary-dialog.component.html',
  styleUrls: ['./timesheet-summary-dialog.component.css']
})
export class TimesheetSummaryDialogComponent implements OnInit {
  msgpassed = true;
  absetees: StudentsData[] ;
  message: any = {};
  constructor(
    public dialogRef: MatDialogRef<TimesheetSummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.absetees = data['absentees'];
      this.message = data['message'];
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
