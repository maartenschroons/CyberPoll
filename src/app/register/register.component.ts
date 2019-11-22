import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: User = new User(0, "", "", "", "");
  registerForm = this.fb.group({
    email: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    cpassword: ['', Validators.required]
  }, { validator: this.matchingPasswords('password', 'cpassword') });
  constructor(private fb: FormBuilder, private _userservice: UserService, private router: Router) { }

  ngOnInit() {
  }

  //Validate if the two entered passwords are identical
  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
        passwordConfirmationInput.setErrors(passwordConfirmationInput.validator(passwordConfirmationInput))
      }
    }
  }

  //Register an account
  onSubmit() {
    this._userservice.getUserByEmail(this.model.email).subscribe(result => {
      //Check if the email entered had been "invited" by another user
      if (result != null && result.username == "") {
        //If the user has been invited, that usermodel gets updated
        this.model.userId = result.userId;
        this._userservice.updateUser(this.model).subscribe();
      }
      else {
        //If the user has not been invited, create a new user
        this._userservice.addUser(this.model).subscribe();
      }
    })

    this.router.navigateByUrl('/login');
  }

}
