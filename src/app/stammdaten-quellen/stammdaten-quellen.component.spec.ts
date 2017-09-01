import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StammdatenQuellenComponent } from './stammdaten-quellen.component';

describe('QuellenDetailsComponent', () => {
  let component: StammdatenQuellenComponent;
  let fixture: ComponentFixture<StammdatenQuellenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StammdatenQuellenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StammdatenQuellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
