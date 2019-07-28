import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkProgress1Component } from './mark-progress1.component';

describe('MarkProgress1Component', () => {
  let component: MarkProgress1Component;
  let fixture: ComponentFixture<MarkProgress1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkProgress1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkProgress1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
