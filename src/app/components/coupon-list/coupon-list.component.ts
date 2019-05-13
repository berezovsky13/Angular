import { Component, OnInit, Input } from '@angular/core';
import { CouponService } from 'src/app/services/coupon.service';
import * as M from "materialize-css/dist/js/materialize";
import { UserCoupon } from 'src/app/classes/UserCoupon';
import { SelectorMatcher } from '@angular/compiler';
import { Router, NavigationEnd } from '@angular/router';
import { CouponListMode } from 'src/app/enums/coupon-list-mode.enum';


@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css']
})
export class CouponListComponent implements OnInit {

  @Input() mode:CouponListMode;
  private couponsList:any;
  private editErrorMessage:string;
  private editedCoupon:UserCoupon;
  private isEditMode:boolean;

  constructor(private couponService:CouponService, private router:Router) {
    this.resetEditedCoupon()
    //this.mode = CouponListMode.ALL;
  }

  ngOnInit() {
    this.couponService.couponsList
    .subscribe ( coupons => {
      this.couponsList = coupons;
    });

    this.couponService.getCoupons(this.mode);

    //Init UI elements again.
    M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {});
    M.Modal.init(document.querySelectorAll('.modal'), {opacity: 0.9});
    
  }

  openEditCouponModal(id:number) {
    console.log(id);
    let elems = document.querySelector('#editCouponModal');
    let instance = M.Modal.getInstance(elems);
    if (id === -1) {
      this.resetEditedCoupon();
    } else {
      let index = this.findIndexById(id);
      this.editedCoupon = this.couponsList[index];
      this.isEditMode = true;
    }
    instance.open();
  }

  resetEditedCoupon() {
    this.editedCoupon = new UserCoupon(-1, "", 0, 0, new Date().toDateString(), new Date().toDateString(), "", "", "", 0);
    this.isEditMode = false;
  }

  deleteCoupon(id:number) {
    this.couponService.deleteCoupon(id)
    .then((res) => {
      console.log("Success", res);
      this.couponService.getCoupons(this.mode);
      this.closeModal();
    }).catch((err) => {
      console.log("received an erorr message", err);
    });

    // TODO - handle the promise
    // Success - close the modal
    // Error - show error message.
  }
  
  closeModal() {
    let elems = document.querySelector('#editCouponModal');
    let instance = M.Modal.getInstance(elems);
    instance.close();
  }

  createCoupon(coupon:UserCoupon) {
    this.couponService.createCoupon(coupon)
    .then (res => {
      this.couponService.getCoupons(this.mode);
      this.closeModal();
    }).catch(err => {
      this.editErrorMessage = err;
    });
  }


  
  updateCoupon(id:number) {
    this.couponService.updateCoupon(id)
    .then((res) => {
      console.log("Success", res);
      let elems = document.querySelector('#editCouponModal');
      let instance = M.Modal.getInstance(elems);
      instance.close();
    }).catch((err) => {
      console.log("received an erorr message", err);
    });

    // TODO - handle the promise
    // Success - close the modal
    // Error - show error message.
  }

  findIndexById(id:number) {
    for (let i = 0; i < this.couponsList.length; i++) {
      if (this.couponsList[i].couponID === id) return i; 
    }
    return -1;
  }

}
