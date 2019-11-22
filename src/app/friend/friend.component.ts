import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Notification } from '../models/notification.model';
import { FriendshipService } from '../services/friendship.service';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {

  friends: Observable<User[]>;
  users: Observable<User[]>;
  friendLength: number;

  constructor(private _friendshipService: FriendshipService, private _userService: UserService, private _notificationService: NotificationService) {
    //Fill friends with a list of friends of the user
    this.friends = this._friendshipService.getAllFriendsbyUser(parseInt(localStorage.getItem("userId")));
    this._friendshipService.getAllFriendsbyUser(parseInt(localStorage.getItem("userId"))).subscribe(result=>{this.friendLength = result.length});
  }

  //Search for users by username and email
  findUserList(name: string) {
    name = name.toLowerCase();
     //Fill users with a list of users that match the given name/email
    this.users = this._userService.getAllUsersByName(name);
  }

  //Add a friend
  addFriend(userId: number) {
    let notification: Notification = new Notification(0, parseInt(localStorage.getItem("userId")), userId, 0, "friend", false, false, "", "","");
    this._notificationService.addNotification(notification).subscribe();
  }

  ngOnInit() {
  }

  //Invite a user without an account
  invite(email: string) {
    //Add an empty user with only email entered
    let user: User = new User(0, email, "", "", "");
    this._userService.addUser(user).subscribe(result => {
      //Send a Friendrequest to the new User
      let notification: Notification = new Notification(0, parseInt(localStorage.getItem("userId")), result.userId, 1, "friend", false, false, "", "", "");
      this._notificationService.addNotification(notification).subscribe();
    });
  }


}
