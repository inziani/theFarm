import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralLedgerDocumentEntryComponent } from './general-ledger-document-entry.component';

describe('GeneralLedgerDocumentEntryComponent', () => {
  let component: GeneralLedgerDocumentEntryComponent;
  let fixture: ComponentFixture<GeneralLedgerDocumentEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralLedgerDocumentEntryComponent]
    });
    fixture = TestBed.createComponent(GeneralLedgerDocumentEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
