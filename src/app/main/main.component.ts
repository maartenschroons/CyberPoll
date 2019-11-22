import { Component, OnInit } from '@angular/core';
import { Poll } from '../models/poll.model';
import { PollService } from '../services/poll.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../models/notification.model';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  useramount: number;
  pollamount: number;
  denyamount: number;
  polls: Observable<Poll[]>;
  users: Observable<User[]>;
  notifications: Observable<Notification[]>;
  loggedIn: boolean;

  constructor(private _pollService: PollService, private _userService: UserService, private _notificationService: NotificationService) {
    this.instantiateVariabels();

    //Check if a user is logged in
    if (localStorage.getItem("loggedIn") == "true") {
      this.loggedIn = false;
    }
    else {
      this.loggedIn = true;
    }

  }

  ngOnInit() {
  }

  //Instantiate all variabels used in the HomePage
  instantiateVariabels() {
    //Instantiate amount of polls
    this._pollService.getAllPolls().subscribe(result => { this.pollamount = result.length });

    //Instantiate amount of users
    this._userService.getAllUsers().subscribe(result => { this.useramount = result.length });

    //Instantiate amount of denied friendinvites
    this._notificationService.getAllNotifications().subscribe(result => { this.denyamount = result.length });

  }

}
