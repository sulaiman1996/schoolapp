import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksentryComponent } from './marksentry.component';

describe('MarksentryComponent', () => {
  let component: MarksentryComponent;
  let fixture: ComponentFixture<MarksentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarksentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarksentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
