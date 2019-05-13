import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserLoginDetails } from 'src/app/classes/user-login-details';
import * as M from "materialize-css/dist/js/materialize";
import { log } from 'util';
import { CouponListMode } from 'src/app/enums/coupon-list-mode.enum';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  private loggedInUser:UserLoginDetails;
  ListType = CouponListMode;

  constructor(private router:Router, private userService:UserService) { }

  ngOnInit() {
    this.userService.loggedInUser
    .subscribe ( user => {
      this.loggedInUser = user;
      if ( this.loggedInUser === undefined ) {
         this.router.navigate(["/login"]);
      }
    });
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems, {});
    });

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.tooltipped');
      var instances = M.Tooltip.init(elems, {});
    });

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.fixed-action-btn');
      var instances = M.FloatingActionButton.init(elems, {});
    });

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems, {opacity: 0.9});
    });

    
  }

}
