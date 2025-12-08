import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickCommercial } from './quick-commercial';

describe('QuickCommercial', () => {
  let component: QuickCommercial;
  let fixture: ComponentFixture<QuickCommercial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuickCommercial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickCommercial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
