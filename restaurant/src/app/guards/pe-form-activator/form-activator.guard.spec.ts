import { TestBed } from '@angular/core/testing';

import { FormActivatorGuard } from './form-activator.guard';

describe('FormActivatorGuard', () => {
  let guard: FormActivatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FormActivatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
