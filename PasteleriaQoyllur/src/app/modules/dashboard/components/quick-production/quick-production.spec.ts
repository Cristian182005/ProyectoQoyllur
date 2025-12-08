import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickProduction } from './quick-production';

describe('QuickProduction', () => {
  let component: QuickProduction;
  let fixture: ComponentFixture<QuickProduction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuickProduction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickProduction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
