import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralLedgerReportsComponent } from './general-ledger-reports.component';

describe('GeneralLedgerReportsComponent', () => {
  let component: GeneralLedgerReportsComponent;
  let fixture: ComponentFixture<GeneralLedgerReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralLedgerReportsComponent]
    });
    fixture = TestBed.createComponent(GeneralLedgerReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
