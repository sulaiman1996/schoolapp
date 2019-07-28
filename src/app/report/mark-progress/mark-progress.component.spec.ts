import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkProgressComponent } from './mark-progress.component';

describe('MarkProgressComponent', () => {
  let component: MarkProgressComponent;
  let fixture: ComponentFixture<MarkProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
