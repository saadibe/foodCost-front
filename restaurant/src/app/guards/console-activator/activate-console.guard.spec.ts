import { TestBed } from '@angular/core/testing';

import { ActivateConsoleGuard } from './activate-console.guard';

describe('ActivateConsoleGuard', () => {
  let guard: ActivateConsoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ActivateConsoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
