import { TestBed } from '@angular/core/testing';

import { AdditionalInformationService } from './additional-information.service';

describe('AdditionalInformationService', () => {
  let service: AdditionalInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
