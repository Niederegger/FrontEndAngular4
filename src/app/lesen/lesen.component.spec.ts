import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LesenComponent } from './lesen.component';

describe('LesenComponent', () => {
  let component: LesenComponent;
  let fixture: ComponentFixture<LesenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LesenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LesenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
