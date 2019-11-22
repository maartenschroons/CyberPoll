import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Poll } from '../models/poll.model';
import { Router } from '@angular/router';
import { PollService } from '../services/poll.service';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Answer } from '../models/answer.model';
import { AnswerService } from '../services/answer.service';
import { VoteService } from '../services/vote.service';
import { Vote } from '../models/vote.model';
import { ParticipationService } from '../services/participation.service';
import { FriendshipService } from '../services/friendship.service';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../models/notification.model';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  poll: Observable<Poll>;
  answerModel: Answer = new Answer(0, 0, 0, "", 0);
  userModel: User = new User(0, "", "", "", "");
  users: Observable<User[]>;
  friends: Observable<User[]>;
  answers: Observable<Answer[]>;
  pollid: number;
  title: string;
  description: string;
  vote: Vote;
  name: string;
  creator: boolean;

  constructor(private fb: FormBuilder, private route: Router, private _pollService: PollService, private _userService: UserService, private _answerService: AnswerService, private _voteService: VoteService, private _participationService: ParticipationService, private _friendshipService: FriendshipService, private _notificationService: NotificationService) {
    //get pollid from previous component
    this.pollid = this.route.getCurrentNavigation().extras.state.pollid;

    this.instantiateLists();
  }

  ngOnInit() {
  }

  //Fill all lists
  instantiateLists() {
    //Fill title and description 
    this._pollService.getPoll(this.pollid).subscribe(result => {
      this.title = result.title;
      this.description = result.description

      if (result.creator == parseInt(localStorage.getItem("userId"))) {
        this.creator = true;
      }
    });

    //Fill list friends
    this.friends = this._friendshipService.getAllFriendsbyUser(parseInt(localStorage.getItem("userId")));

    //Fill list answers
    this.answers = this._answerService.getAllAnswersbyPoll(this.pollid);

    //Fill list users
    this.users = this._userService.getAllUsersByParticipation(this.pollid);

    
  }

  //Add answer to the current poll
  addAnswer() {
    //Add an answer with input
    this.answerModel.pollId = this.pollid;
    this.answerModel.userId = parseInt(localStorage.getItem("userId"));
    this._answerService.addAnswer(this.answerModel).subscribe(result => { this.answers = this._answerService.getAllAnswersbyPoll(this.pollid); });

  }

  //Vote on an answer
  Vote(answerId: number) {
    //Add a vote
    this.vote = new Vote(0, answerId, parseInt(localStorage.getItem("userId")));
    this._voteService.addVote(this.vote).subscribe(result => { this.answers = this._answerService.getAllAnswersbyPoll(this.pollid); });

  }

  //Add a user to the current poll
  addUser() {
    //Send a pollrequest to the selected friend
    let notification: Notification = new Notification(0, parseInt(localStorage.getItem("userId")), this.userModel.userId, this.pollid, "poll", false, false, "", "", "");
    this._notificationService.addNotification(notification).subscribe();
  }

  //Invite a user without an account
  invite(email: string) {
    //Add an empty user with only email entered
    let user: User = new User(0, email, "", "", "");
    this._userService.addUser(user).subscribe(result => {
      //Send a Pollrequest to the new User
      let notification: Notification = new Notification(0, parseInt(localStorage.getItem("userId")), result.userId, this.pollid, "poll", false, false, "", "", "");
      this._notificationService.addNotification(notification).subscribe();

      //Send a Friendrequest to the new User
      let notificationF: Notification = new Notification(0, parseInt(localStorage.getItem("userId")), result.userId, 1, "friend", false, false, "", "", "");
      this._notificationService.addNotification(notificationF).subscribe();
    });
  }
}
