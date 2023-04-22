import { NgModule } from "@angular/core";
import { RouterModule, Routes, Router } from "@angular/router";
// import { AppComponent } from "./app.component";


const routes: Routes = [
  {
    path: 'auth',
    loadChildren:() => import('./_helpers/routings/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'users',
    loadChildren:() => import('./_helpers/routings/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'finance',
    loadChildren:() => import('./finance/finance.module').then(m => m.FinanceModule)

  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
