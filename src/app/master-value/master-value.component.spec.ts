import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterValueComponent } from './master-value.component';

describe('MasterValueComponent', () => {
  let component: MasterValueComponent;
  let fixture: ComponentFixture<MasterValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
