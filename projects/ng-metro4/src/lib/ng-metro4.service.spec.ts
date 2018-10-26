import { TestBed } from '@angular/core/testing';

import { NgMetro4Service } from './ng-metro4.service';

describe('NgMetro4Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgMetro4Service = TestBed.get(NgMetro4Service);
    expect(service).toBeTruthy();
  });
});
