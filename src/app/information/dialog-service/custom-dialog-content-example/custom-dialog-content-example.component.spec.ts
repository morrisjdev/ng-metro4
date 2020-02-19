import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDialogContentExampleComponent } from './custom-dialog-content-example.component';

describe('CustomDialogContentExampleComponent', () => {
  let component: CustomDialogContentExampleComponent;
  let fixture: ComponentFixture<CustomDialogContentExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomDialogContentExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDialogContentExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
