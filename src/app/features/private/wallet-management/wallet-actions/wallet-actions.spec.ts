import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletActions } from './wallet-actions';

describe('WalletActions', () => {
  let component: WalletActions;
  let fixture: ComponentFixture<WalletActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletActions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletActions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
