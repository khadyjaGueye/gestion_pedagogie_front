import { TestBed } from '@angular/core/testing';

import { AnnulerAccepteService } from './annuler-accepte.service';

describe('AnnulerAccepteService', () => {
  let service: AnnulerAccepteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnulerAccepteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
