import { TestBed } from '@angular/core/testing';

import { RectangleConfigService } from './rectangle-config.service';

describe('RectangleConfigService', () => {
  let service: RectangleConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RectangleConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
