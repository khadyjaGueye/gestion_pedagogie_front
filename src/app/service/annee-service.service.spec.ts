import { TestBed } from '@angular/core/testing';

import { AnneeServiceService } from './annee-service.service';

describe('AnneeServiceService', () => {
  let service: AnneeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnneeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
