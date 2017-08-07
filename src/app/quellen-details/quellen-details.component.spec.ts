import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuellenDetailsComponent } from './quellen-details.component';

describe('QuellenDetailsComponent', () => {
  let component: QuellenDetailsComponent;
  let fixture: ComponentFixture<QuellenDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuellenDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuellenDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
