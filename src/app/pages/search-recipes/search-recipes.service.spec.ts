import { TestBed } from '@angular/core/testing';

import { SearchRecipesService } from './search-recipes.service';

describe('SearchRecipesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchRecipesService = TestBed.get(SearchRecipesService);
    expect(service).toBeTruthy();
  });
});
