import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalesHomepageComponent } from './sales-homepage/sales-homepage.component';

const providers: any = [];
@NgModule({
  declarations: [
    AppComponent,
    SalesHomepageComponent
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
export class HumanResourcesSharedModule{
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
export class MaterialsManagementSharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [providers, ]
    }
  }
}

