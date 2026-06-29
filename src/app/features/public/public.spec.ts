import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicFeature } from './public';

describe('Public', () => {
  let component: PublicFeature;
  let fixture: ComponentFixture<PublicFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicFeature]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicFeature);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
