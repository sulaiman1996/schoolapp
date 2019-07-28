import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressPrintComponent } from './progress-print.component';

describe('ProgressPrintComponent', () => {
  let component: ProgressPrintComponent;
  let fixture: ComponentFixture<ProgressPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
