import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucheComponent } from './suche.component';

describe('SucheComponent', () => {
  let component: SucheComponent;
  let fixture: ComponentFixture<SucheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
