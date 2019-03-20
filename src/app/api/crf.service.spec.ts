import { TestBed } from '@angular/core/testing';

import { CrfService } from './crf.service';

describe('CrfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrfService = TestBed.get(CrfService);
    expect(service).toBeTruthy();
  });
});
