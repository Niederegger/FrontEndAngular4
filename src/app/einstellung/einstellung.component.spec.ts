import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EinstellungComponent } from './einstellung.component';

describe('EinstellungComponent', () => {
  let component: EinstellungComponent;
  let fixture: ComponentFixture<EinstellungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EinstellungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EinstellungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
