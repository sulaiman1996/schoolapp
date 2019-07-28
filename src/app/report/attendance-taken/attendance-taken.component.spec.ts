import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceTakenComponent } from './attendance-taken.component';

describe('AttendanceTakenComponent', () => {
  let component: AttendanceTakenComponent;
  let fixture: ComponentFixture<AttendanceTakenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceTakenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceTakenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
