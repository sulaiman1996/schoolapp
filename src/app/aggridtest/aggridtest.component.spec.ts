import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggridtestComponent } from './aggridtest.component';

describe('AggridtestComponent', () => {
  let component: AggridtestComponent;
  let fixture: ComponentFixture<AggridtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggridtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggridtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
