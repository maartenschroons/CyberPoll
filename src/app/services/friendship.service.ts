import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Friendship } from '../models/friendship.model';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  constructor(private http: HttpClient) { }
  //Get a list of friendship from user
  getAllFriendsbyUser(userid: number): Observable<User[]> {
    return this.http.get<User[]>("https://localhost:44311/api/Friendship/user/" + userid)
  }

  //Add a friendship
  addFriendship(friendship: Friendship) {
    return this.http.post<Notification>("https://localhost:44311/api/Friendship", friendship);
  }
}
