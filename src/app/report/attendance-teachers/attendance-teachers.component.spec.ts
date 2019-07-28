import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceTeachersComponent } from './attendance-teachers.component';

describe('AttendanceTeachersComponent', () => {
  let component: AttendanceTeachersComponent;
  let fixture: ComponentFixture<AttendanceTeachersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceTeachersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
