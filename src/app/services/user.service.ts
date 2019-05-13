import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserLoginDetails } from '../classes/user-login-details';
import { UserType } from '../enums/user-type.enum';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpUtils, baseRestURL } from '../enums/http-utils.enum';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userDetails = new BehaviorSubject<UserLoginDetails>(undefined);
  public loggedInUser = this.userDetails.asObservable();
  public loggedInUserId;

  constructor(private router:Router, private http:HttpClient) {
    let newUserDetails:UserLoginDetails = JSON.parse(localStorage.getItem("loginDetails"));
    this.userDetails.next(newUserDetails);
  }

  public login (newUserDetails: UserLoginDetails) {
    // We create a new promise for this request.
    // This will allow the Login Component to "wait" for the result
    let promise = new Promise((resolve, reject) => {
      let url = baseRestURL + HttpUtils.LoginApi;
      // Create the http request
      this.http.post(url, newUserDetails)
        .toPromise() // Turn to promise
        .then((res) => { 
          // Handle success
          // userDetails is a service data, so we update the Subject/Observable
          // This will allow other components (Company, customer) to access it.
          this.userDetails.next(newUserDetails);

          localStorage.setItem("loginDetails", JSON.stringify(newUserDetails));

          // We send empty resolve, since all we care about is the success code.
          // TODO: If we were redirected to login, return instructions to the Login component.
          // Instructions = where do we need to navigate back to?
          console.log(res);
          this.loggedInUserId = res;

          let redirectInfo;
          if (this.userDetails.getValue().userType === UserType.Company) {
            redirectInfo = "/company"
          } else if (this.userDetails.getValue().userType === UserType.Customer) {
            redirectInfo = "/customer"
          } else if (this.userDetails.getValue().userType === UserType.Admin) {
            redirectInfo = "/admin"
          }  else {
            redirectInfo = "/login"
          }

          resolve(redirectInfo);
          
        }, (err) => {
          // Handle the error, here we need to return the error message.
          console.log(err);
          let errorMessage = (err.error.internalMessage) ? err.error.internalMessage : "Something went wrong.";
          reject(errorMessage);
        });
    })
    return promise;
  }
}
