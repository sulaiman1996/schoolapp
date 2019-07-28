import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsterCreateComponent } from './mster-create.component';

describe('MsterCreateComponent', () => {
  let component: MsterCreateComponent;
  let fixture: ComponentFixture<MsterCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsterCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
