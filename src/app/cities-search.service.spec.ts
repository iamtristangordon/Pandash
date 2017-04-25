import { TestBed, inject } from '@angular/core/testing';

import { CitiesSearchService } from './cities-search.service';

describe('CitiesSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CitiesSearchService]
    });
  });

  it('should ...', inject([CitiesSearchService], (service: CitiesSearchService) => {
    expect(service).toBeTruthy();
  }));
});
