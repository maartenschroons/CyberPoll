import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Userlogin } from '../models/userlogin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  constructor(private _httpClient: HttpClient) { }

  //Log in the user
  authenticate(userLogin: Userlogin): Observable<User> {
    return this._httpClient.post<User>("https://localhost:44311/api/User/authenticate", userLogin); 
  }
}
