import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

import { GeneralLedgerRoutingModule } from './general-ledger-routing.module';
import { GeneralLedgerComponent } from './general-ledger.component';
import { GeneralLedgerDocumentEntryComponent } from './general-ledger-document-entry/general-ledger-document-entry.component';

@NgModule({
  declarations: [GeneralLedgerComponent, GeneralLedgerDocumentEntryComponent],
  imports: [CommonModule, GeneralLedgerRoutingModule, SharedModule],
})
export class GeneralLedgerModule {}
