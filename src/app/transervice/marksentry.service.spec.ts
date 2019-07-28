import { TestBed, inject } from '@angular/core/testing';

import { MarksentryService } from './marksentry.service';

describe('MarksentryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarksentryService]
    });
  });

  it('should be created', inject([MarksentryService], (service: MarksentryService) => {
    expect(service).toBeTruthy();
  }));
});
