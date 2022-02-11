import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@app/_helpers/authentication.guard';
import { FinanceHomepageComponent } from './finance-homepage/finance-homepage.component';
import { GlDocumentPostingComponent } from './general-ledger/gl-document-posting/gl-document-posting.component';
import { GlHomepageComponent } from './general-ledger/gl-homepage/gl-homepage.component';
import { GlMasterdataComponent } from './general-ledger/gl-masterdata/gl-masterdata.component';


const routes: Routes = [
  { path: '', component: FinanceHomepageComponent },
  { path: 'home', component: FinanceHomepageComponent },
  { path: 'finance', component: FinanceHomepageComponent},
  { path: 'financehomepage', component: FinanceHomepageComponent},
  { path: 'generalledgerhome', component: GlHomepageComponent },
  { path: "glposting", component: GlDocumentPostingComponent },
  { path: "createmaster", component: GlMasterdataComponent },


  { path: 'financeit', redirectTo: 'generalledgerhome', pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
