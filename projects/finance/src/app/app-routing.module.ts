import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@app/_helpers/authentication.guard';
import { FinanceHomepageComponent } from './finance-homepage/finance-homepage.component';
import { GlDocumentPostingComponent } from './general-ledger/gl-document-posting/gl-document-posting.component';
import { GlHomepageComponent } from './general-ledger/gl-homepage/gl-homepage.component';
import { GlMasterdataComponent } from './general-ledger/gl-masterdata/gl-masterdata.component';

const routes: Routes = [

  { path: 'finance', redirectTo: 'financehome', pathMatch: 'full'},
  { path: 'financehome', component: FinanceHomepageComponent, canActivate: [AuthenticationGuard] },
  { path: "finance/glposting", component: GlDocumentPostingComponent, canActivate: [AuthenticationGuard] },
  { path: "finance/createmaster", component: GlMasterdataComponent , canActivate: [AuthenticationGuard]},
  { path: "glhomepage", component: GlHomepageComponent, canActivate: [AuthenticationGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
