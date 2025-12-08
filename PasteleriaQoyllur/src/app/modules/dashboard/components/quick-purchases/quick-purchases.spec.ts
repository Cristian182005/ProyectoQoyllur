import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPurchases } from './quick-purchases';

describe('QuickPurchases', () => {
  let component: QuickPurchases;
  let fixture: ComponentFixture<QuickPurchases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuickPurchases]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickPurchases);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
