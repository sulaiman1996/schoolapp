import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestaggridComponent } from './testaggrid.component';

describe('TestaggridComponent', () => {
  let component: TestaggridComponent;
  let fixture: ComponentFixture<TestaggridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestaggridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestaggridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
