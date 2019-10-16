import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlWrapperComponent } from './form-control-wrapper.component';

describe('FormWrapperComponent', () => {
  let component: FormControlWrapperComponent;
  let fixture: ComponentFixture<FormControlWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
