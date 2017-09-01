import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StammdatenComponent } from './stammdaten.component';

describe('Quellen2Component', () => {
  let component: StammdatenComponent;
  let fixture: ComponentFixture<StammdatenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StammdatenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StammdatenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
