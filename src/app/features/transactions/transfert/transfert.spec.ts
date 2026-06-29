import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Transfert } from './transfert';

describe('Transfert', () => {
  let component: Transfert;
  let fixture: ComponentFixture<Transfert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Transfert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Transfert);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
