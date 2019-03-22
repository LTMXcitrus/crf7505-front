import { TestBed } from '@angular/core/testing';

import { PegassLoginService } from './pegass-login-service.service';

describe('PegassLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PegassLoginService = TestBed.get(PegassLoginService);
    expect(service).toBeTruthy();
  });
});
