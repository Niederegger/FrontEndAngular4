import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Quellen2Component } from './quellen2.component';

describe('Quellen2Component', () => {
  let component: Quellen2Component;
  let fixture: ComponentFixture<Quellen2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Quellen2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Quellen2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
