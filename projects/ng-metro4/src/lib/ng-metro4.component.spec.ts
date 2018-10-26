import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMetro4Component } from './ng-metro4.component';

describe('NgMetro4Component', () => {
  let component: NgMetro4Component;
  let fixture: ComponentFixture<NgMetro4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgMetro4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgMetro4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
