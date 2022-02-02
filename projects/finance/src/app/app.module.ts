import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlHomepageComponent } from './general-ledger/gl-homepage/gl-homepage.component';
import { GlMasterdataComponent } from './general-ledger/gl-masterdata/gl-masterdata.component';
import { GlDocumentPostingComponent } from './general-ledger/gl-document-posting/gl-document-posting.component';


const providers: any = [];
@NgModule({
  declarations: [
    AppComponent,
    GlHomepageComponent,
    GlMasterdataComponent,
    GlDocumentPostingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [providers,],
  bootstrap: [AppComponent]
})
export class AppModule { }



@NgModule({})
export class SalesSharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [providers, ]
    }
  }
}
