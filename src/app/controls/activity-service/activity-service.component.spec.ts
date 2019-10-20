import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityServiceComponent } from './activity-service.component';

describe('ActivityServiceComponent', () => {
  let component: ActivityServiceComponent;
  let fixture: ComponentFixture<ActivityServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
