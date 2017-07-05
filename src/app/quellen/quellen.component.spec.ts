import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuellenComponent } from './quellen.component';

describe('QuellenComponent', () => {
  let component: QuellenComponent;
  let fixture: ComponentFixture<QuellenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuellenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
