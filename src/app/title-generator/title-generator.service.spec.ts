import { TestBed } from '@angular/core/testing';

import { TitleGeneratorService } from './title-generator.service';

describe('TitleGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TitleGeneratorService = TestBed.get(TitleGeneratorService);
    expect(service).toBeTruthy();
  });
});
