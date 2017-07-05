import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnmeldenComponent } from './anmelden.component';

describe('AnmeldenComponent', () => {
  let component: AnmeldenComponent;
  let fixture: ComponentFixture<AnmeldenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnmeldenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnmeldenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
