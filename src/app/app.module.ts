import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from "@angular/forms";


import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { CustomerComponent } from './components/customer/customer.component';
import { CouponListComponent } from './components/coupon-list/coupon-list.component';
import { CouponService } from './services/coupon.service';
import { CompanyComponent } from './components/company/company.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    CustomerComponent,
    CouponListComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService, CouponService],
  bootstrap: [AppComponent]
})
export class AppModule { }
