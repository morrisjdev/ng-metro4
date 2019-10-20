import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetControlsComponent } from './get-controls.component';

describe('GetControlsComponent', () => {
  let component: GetControlsComponent;
  let fixture: ComponentFixture<GetControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
