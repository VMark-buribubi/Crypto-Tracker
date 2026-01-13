import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioDialog } from './portfolio-dialog';

describe('PortfolioDialog', () => {
  let component: PortfolioDialog;
  let fixture: ComponentFixture<PortfolioDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
