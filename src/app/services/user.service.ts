import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  //Get a list of all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>("https://localhost:44311/api/User");
  }

  //Get a list of all users by name/email
  getAllUsersByName(name: string): Observable<User[]> {
    return this.http.get<User[]>("https://localhost:44311/api/User/name/" + name);
  }

  //Add a user
  addUser(user: User){
    return this.http.post<User>("https://localhost:44311/api/User", user);
  }

  //Get a user by userId
  getUser(userId: number): Observable<User>{
    return this.http.get<User>("https://localhost:44311/api/User/"+ userId);
  }

  //Get a list of all users that participate in a given poll
  getAllUsersByParticipation(pollId: number): Observable<User[]> {
    return this.http.get<User[]>("https://localhost:44311/api/Participation/users/" + pollId)
  }

  //Get a user by only email
  getUserByEmail(email: string): Observable<User>{
    return this.http.get<User>("https://localhost:44311/api/User/email/"+ email)
  }

  //Update user
  updateUser(user: User) {
    return this.http.put<User>("https://localhost:44311/api/User/" + user.userId, user);
  }
}
