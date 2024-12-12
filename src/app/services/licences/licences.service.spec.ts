import { TestBed } from '@angular/core/testing';

import { LicencesService } from './licences.service';

describe('LicencesService', () => {
  let service: LicencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
