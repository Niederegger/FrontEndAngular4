import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UeberWpWikiComponent } from './ueber-wp-wiki.component';

describe('UeberWpWikiComponent', () => {
  let component: UeberWpWikiComponent;
  let fixture: ComponentFixture<UeberWpWikiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UeberWpWikiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UeberWpWikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
