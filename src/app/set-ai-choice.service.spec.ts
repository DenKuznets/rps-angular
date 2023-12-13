import { TestBed } from '@angular/core/testing';

import { aiChoiceService } from './set-ai-choice.service';

describe('SetAiChoiceService', () => {
  let service: aiChoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(aiChoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
