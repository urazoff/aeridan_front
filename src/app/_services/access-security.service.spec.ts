import { TestBed } from '@angular/core/testing';

import { AccessSecurityService } from './access-security.service';

describe('AccessSecurityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccessSecurityService = TestBed.get(AccessSecurityService);
    expect(service).toBeTruthy();
  });
});
