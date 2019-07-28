import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolExamComponent } from './school-exam.component';

describe('SchoolExamComponent', () => {
  let component: SchoolExamComponent;
  let fixture: ComponentFixture<SchoolExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
