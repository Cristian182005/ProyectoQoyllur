import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickInventory } from './quick-inventory';

describe('QuickInventory', () => {
  let component: QuickInventory;
  let fixture: ComponentFixture<QuickInventory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuickInventory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickInventory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
