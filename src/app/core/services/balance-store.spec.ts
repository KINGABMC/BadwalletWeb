import { TestBed } from '@angular/core/testing';

import { BalanceStore } from './balance-store';

describe('BalanceStore', () => {
  let service: BalanceStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalanceStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
