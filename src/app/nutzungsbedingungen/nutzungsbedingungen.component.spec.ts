import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutzungsbedingungenComponent } from './nutzungsbedingungen.component';

describe('NutzungsbedingungenComponent', () => {
  let component: NutzungsbedingungenComponent;
  let fixture: ComponentFixture<NutzungsbedingungenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutzungsbedingungenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutzungsbedingungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
