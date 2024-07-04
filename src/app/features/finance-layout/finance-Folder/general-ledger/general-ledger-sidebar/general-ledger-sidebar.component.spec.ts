import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralLedgerSidebarComponent } from './general-ledger-sidebar.component';

describe('GeneralLedgerSidebarComponent', () => {
  let component: GeneralLedgerSidebarComponent;
  let fixture: ComponentFixture<GeneralLedgerSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralLedgerSidebarComponent]
    });
    fixture = TestBed.createComponent(GeneralLedgerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
