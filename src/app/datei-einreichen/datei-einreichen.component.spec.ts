import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateiEinreichenComponent } from './datei-einreichen.component';

describe('DateiEinreichenComponent', () => {
  let component: DateiEinreichenComponent;
  let fixture: ComponentFixture<DateiEinreichenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateiEinreichenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateiEinreichenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
