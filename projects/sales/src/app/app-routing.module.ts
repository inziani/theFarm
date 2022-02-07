import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesHomepageComponent } from './sales-homepage/sales-homepage.component';

const routes: Routes = [

  { path: 'sales', component: SalesHomepageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
