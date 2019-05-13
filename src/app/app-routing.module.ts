import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CompanyComponent } from './components/company/company.component';
import { CustomerComponent } from './components/customer/customer.component';

const routes: Routes = [
  
  {path:'login', component: LoginComponent},
  {path:'company', component: CompanyComponent},
  {path:'customer', component: CustomerComponent},
  //{path:'login/:autoLogin', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, CompanyComponent,CustomerComponent];