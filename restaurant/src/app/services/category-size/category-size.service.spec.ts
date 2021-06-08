import { TestBed } from '@angular/core/testing';

import { CategorySizeService } from './category-size.service';

describe('CategorySizeService', () => {
  let service: CategorySizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorySizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
