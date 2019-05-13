import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserLoginDetails } from 'src/app/classes/user-login-details';
import { UserType } from 'src/app/enums/user-type.enum';
import * as M from "materialize-css/dist/js/materialize";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private userDetails : UserLoginDetails;
  private isLoading : boolean;
  private errorMessage : string;
  

  constructor(private router:Router, private userService: UserService) { 
    this.userDetails = new UserLoginDetails("", "", UserType.Customer);
    this.isLoading = false;
    this.errorMessage = "";
  }

  ngOnInit() {
    // Check for route param "autoLogin"
    // If we have it, load userDetails from local Storage
    // and login()

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.slider');
      var instances = M.Slider.init(elems, {});
    });

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems, {opacity: 0.9});
    });
  }

  login () {
    this.isLoading = true;
    this.userService.login(this.userDetails)
    .then((res) => {
      this.isLoading = false;
      console.log("Success", res);
      let elems = document.querySelector('#loginModal');
      let instance = M.Modal.getInstance(elems);
      instance.close();
      this.router.navigate([res]);

    }).catch((err) => {
      this.isLoading = false;
      console.log("Login component received an erorr message", err);
      this.errorMessage = err;
    });

  }

  loginFromAppComponent(loginDetails) {
    this.userDetails = loginDetails;
    this.login()
  }

}
