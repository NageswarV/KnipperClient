import { TestBed, inject } from '@angular/core/testing';

import { TranslationHelperService } from './translation-helper.service';

describe('TranslationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslationHelperService]
    });
  });

  it('should be created', inject([TranslationHelperService], (service: TranslationHelperService) => {
    expect(service).toBeTruthy();
  }));
});
