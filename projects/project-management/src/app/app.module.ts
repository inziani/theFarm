import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ModuleWithProviders } from '@angular/compiler/src/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsHomepageComponent } from './projects-homepage/projects-homepage.component';

const providers: any = [];

@NgModule({
  declarations: [
    AppComponent,
    ProjectsHomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
export class SalesSharedModule{
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
