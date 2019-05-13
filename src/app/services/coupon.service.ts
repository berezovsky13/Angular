import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUtils, baseRestURL } from '../enums/http-utils.enum';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserCoupon } from '../classes/UserCoupon';
import { CouponListMode } from '../enums/coupon-list-mode.enum';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CouponService {


  public  updateCoupon(couponID: number): any {
    throw new Error("Method not implemented.");
  }

  private _couponsList = new BehaviorSubject<any>([]);
  public couponsList = this._couponsList.asObservable();

  constructor(private http:HttpClient, private userService:UserService) { }

  public getCoupons (mode) {
    /* Calls API for
     * getCouponByCompany
     * getPurchasedCoupons
     * getPurchasedCouponsByCustomer
     * getPurchasedCouponsByCompany
    */
    let url = baseRestURL + mode;
    //Check if we need to send to user ID.
    if (mode == CouponListMode.COMPANY || 
      mode == CouponListMode.COMPANY_PURCHASED || 
      mode == CouponListMode.CUSTOMER_PURCHASED) {
      url += "/" + this.userService.loggedInUserId;
    }
    let promise = new Promise((resolve, reject) => {
      // Create the http request
      this.http.get(url)
        .toPromise() // Turn to promise
        .then(res => { 
          // Handle success
          // couponList is a service data, so we update the Subject/Observable
          // This will allow other components (Company, customer) to access it.
          console.log(res);
          this._couponsList.next(res);
          resolve();
          
        }, (err) => {
          // Handle the error, here we need to return the error message.
          console.log(err);
          let errorMessage = (err.error.internalMessage) ? err.error.internalMessage : "Something went wrong.";
          reject(errorMessage);
        });
    })
    return promise;
  }

  public deleteCoupon(couponID: number) {
    // We create a new promise for this request.
    let promise = new Promise((resolve, reject) => {
      // Create the http request
      this.http.delete("http://localhost:8080/CouponsProjectWeb/rest/coupons/"+couponID)
        .toPromise() // Turn to promise
        .then((res) => { 
          // Handle success
          resolve();
        }, (err) => {
          // Handle the error, here we need to return the error message.
          console.log(err);
          let errorMessage = (err.error.internalMessage) ? err.error.internalMessage : "Something went wrong.";
          reject(errorMessage);
        });
    })
    return promise;
  }

  public createCoupon(coupon:UserCoupon) {
    let promise = new Promise((resolve, reject) => {
      coupon.companyID = this.userService.loggedInUserId;
      this.http.post("http://localhost:8080/CouponsProjectWeb/rest/coupons/", coupon)
      .toPromise()
      .then((res) => {
        resolve();
      }, (err) => {
        let errorMessage = (err.error.internalMessage) ? err.error.internalMessage : "Something went wrong.";
        reject(errorMessage);
      });
    })
    return promise;
  }

  // public updateCoupon(couponID: number) {
  //   // We create a new promise for this request.
  //   let promise = new Promise((resolve, reject) => {
  //     // Create the http request
  //     this.http.put("http://localhost:8080/CouponsProjectWeb/rest/coupons")
  //       .toPromise() // Turn to promise
  //       .then((res) => { 
  //         // Handle success
  //         //TODO Loading indicator???
  //         this.updateCoupon();
  //         resolve();
          
  //       }, (err) => {
  //         // Handle the error, here we need to return the error message.
  //         console.log(err);
  //         let errorMessage = (err.error.internalMessage) ? err.error.internalMessage : "Something went wrong.";
  //         reject(errorMessage);
  //       });
  //   })
  //   return promise;
  // }




}


