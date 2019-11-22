import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Userlogin } from '../models/userlogin.model';
import { AuthenticateService } from '../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: Userlogin = new Userlogin("", "");
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
  
  constructor(private fb: FormBuilder, private _authenticateService: AuthenticateService, private router: Router) { }

  ngOnInit() {
  }


  //Log in with username and password from a form
  onSubmit() {
    this._authenticateService.authenticate(this.model).subscribe(result => {
      //Set localStorage items after signing in and go to the dashboard
      localStorage.setItem("token", result.token);
      localStorage.setItem("userId", result.userId.toString());
      localStorage.setItem("loggedIn", "true");
      this.router.navigateByUrl('/dashboard');
    });
    
  }

}
