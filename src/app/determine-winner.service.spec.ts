import { TestBed } from '@angular/core/testing';

import { DetermineWinnerService } from './determine-winner.service';

describe('DetermineWinnerService', () => {
  let service: DetermineWinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetermineWinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
