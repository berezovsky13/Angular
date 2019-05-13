import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserLoginDetails } from 'src/app/classes/user-login-details';
import * as M from "materialize-css/dist/js/materialize";
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  private loggedInUser:UserLoginDetails;

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

  }
}
