import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlHomepageComponent } from './general-ledger/gl-homepage/gl-homepage.component';
import { GlMasterdataComponent } from './general-ledger/gl-masterdata/gl-masterdata.component';
import { GlDocumentPostingComponent } from './general-ledger/gl-document-posting/gl-document-posting.component';
import { FinanceHomepageComponent } from './finance-homepage/finance-homepage.component';
import { FinanceNavbarComponent } from './finance-navbar/finance-navbar.component';



const providers: any = [];
@NgModule({
  declarations: [
    AppComponent,
    GlHomepageComponent,
    GlMasterdataComponent,
    GlDocumentPostingComponent,
    FinanceHomepageComponent,
    FinanceNavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,

  ],
  providers: [providers,],
  bootstrap: [AppComponent]
})
export class AppModule { }


@NgModule({})
export class FinanceSharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [providers, ]
    }
  }
}
@NgModule({})
export class SalesSharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [providers, ]
    }
  }
}

@NgModule({})
export class ProjectManagementSharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [providers, ]
    }
  }
}

@NgModule({})
export class HumanResourcesSharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [providers, ]
    }
  }
}

@NgModule({})
export class MaterialsManagementSharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [providers, ]
    }
  }
}
