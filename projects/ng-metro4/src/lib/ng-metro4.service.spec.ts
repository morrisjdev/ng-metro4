import { TestBed, inject } from '@angular/core/testing';

import { NgMetro4Service } from './ng-metro4.service';

describe('NgMetro4Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgMetro4Service]
    });
  });

  it('should be created', inject([NgMetro4Service], (service: NgMetro4Service) => {
    expect(service).toBeTruthy();
  }));
});
