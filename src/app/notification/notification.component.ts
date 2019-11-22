import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';
import { NotificationService } from '../services/notification.service';
import { Participant } from '../models/participant.model';
import { ParticipationService } from '../services/participation.service';
import { FriendshipService } from '../services/friendship.service';
import { Friendship } from '../models/friendship.model';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  friendinvites: Observable<Notification[]>;
  pollinvites: Observable<Notification[]>;
  sentinvites: Observable<Notification[]>;
  sentLength: number;
  pollLength: number;
  friendLength: number;

  constructor(private _AppComponent: AppComponent, private router: Router, private _notificationService: NotificationService, private _participationService: ParticipationService, private _friendService: FriendshipService) {
    this.instantiateLists();
  }

  ngOnInit() {
  }

  //Fill all lists
  instantiateLists() {

    //Fill list sentinvites with all sent invites by user
    this.sentinvites = this._notificationService.getAllSentNotifications(parseInt(localStorage.getItem("userId")));
    this._notificationService.getAllSentNotifications(parseInt(localStorage.getItem("userId"))).subscribe(result =>{this.sentLength = result.length});


    //Fill list pollinvites with all invites for poll
    this.pollinvites = this._notificationService.getAllPollNotifications(parseInt(localStorage.getItem("userId")));
    this._notificationService.getAllPollNotifications(parseInt(localStorage.getItem("userId"))).subscribe(result =>{this.pollLength = result.length});

    //Fill list friendinvites with all friendrequests
    this.friendinvites = this._notificationService.getAllFriendNotifications(parseInt(localStorage.getItem("userId")));
    this._notificationService.getAllFriendNotifications(parseInt(localStorage.getItem("userId"))).subscribe(result =>{this.friendLength = result.length});
  }

  //Accept the selected friendrequest
  acceptFriend(not: Notification) {
    //Update the selected notification
    not.accepted = true;
    not.answered = true;
    this._notificationService.updateNotification(not).subscribe();

    //Add friendship
    let friendship: Friendship = new Friendship(0, not.receiverId, not.senderId);
    this._friendService.addFriendship(friendship).subscribe(result => { this.instantiateLists(); });

  }

  //Ignore the selected request by updating selected notification
  ignore(not: Notification) {
    not.accepted = false;
    not.answered = true;
    this._notificationService.updateNotification(not).subscribe(result => { this.instantiateLists(); });
  }

  //Accept the selected pollrequest
  acceptPoll(not: Notification) {
    //Update the selected notification
    not.accepted = true;
    not.answered = true;
    this._notificationService.updateNotification(not).subscribe();

    //Add a participation
    let participant = new Participant(0, not.pollId, not.receiverId);
    this._participationService.addParticipation(participant).subscribe(result => { this.instantiateLists(); });
  }

  //Delete the selected notification
  deleteNotification(notId: number) {
    this._notificationService.deleteNotification(notId).subscribe(result => { this.instantiateLists(); });
  }


}
