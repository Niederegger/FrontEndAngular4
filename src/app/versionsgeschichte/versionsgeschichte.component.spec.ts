import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionsgeschichteComponent } from './versionsgeschichte.component';

describe('VersionsgeschichteComponent', () => {
  let component: VersionsgeschichteComponent;
  let fixture: ComponentFixture<VersionsgeschichteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionsgeschichteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionsgeschichteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
