import { Component, ViewChild } from '@angular/core';

import { UserLoginDetails } from './classes/user-login-details';
import { LoginComponent } from './components/login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router:Router) {
    
  }

  ngOnInit(){
    this.router.navigate(["/login"]);
   
  }

}

