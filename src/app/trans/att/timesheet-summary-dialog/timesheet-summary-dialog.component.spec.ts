import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetSummaryDialogComponent } from './timesheet-summary-dialog.component';

describe('TimesheetSummaryDialogComponent', () => {
  let component: TimesheetSummaryDialogComponent;
  let fixture: ComponentFixture<TimesheetSummaryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetSummaryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetSummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
