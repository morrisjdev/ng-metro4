import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotkeyComponent } from './hotkey.component';

describe('HotkeyComponent', () => {
  let component: HotkeyComponent;
  let fixture: ComponentFixture<HotkeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotkeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
