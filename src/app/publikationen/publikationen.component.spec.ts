import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublikationenComponent } from './publikationen.component';

describe('PublikationenComponent', () => {
  let component: PublikationenComponent;
  let fixture: ComponentFixture<PublikationenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublikationenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublikationenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
