import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceProgressComponent } from './attendance-progress.component';

describe('AttendanceProgressComponent', () => {
  let component: AttendanceProgressComponent;
  let fixture: ComponentFixture<AttendanceProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
