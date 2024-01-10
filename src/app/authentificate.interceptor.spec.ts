import { TestBed } from '@angular/core/testing';

import { AuthentificateInterceptor } from './authentificate.interceptor';

describe('AuthentificateInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthentificateInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthentificateInterceptor = TestBed.inject(AuthentificateInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
