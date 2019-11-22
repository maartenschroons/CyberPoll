import { Component, OnInit } from '@angular/core';
import { Poll } from '../models/poll.model';
import { Observable } from 'rxjs';
import { PollService } from '../services/poll.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';
import { ParticipationService } from '../services/participation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cpolls: Observable<Poll[]>;
  ppolls: Observable<Poll[]>;
  name: string;
  cpollsLength: number;
  ppollsLength: number;
  notificationAmount: number;

  constructor(private _pollService: PollService, private _participationService: ParticipationService, private router: Router, private _userService: UserService, private _notificationService: NotificationService) {
    this.instantiateVariables();
  }

  //Redirects the routing to pollcomponent with  the selected pollId as a parameter
  showPoll(poll: Poll) {
    this.router.navigate(['/poll'], { state: { pollid: poll.pollId } });
  }
  //Delete the selected poll
  deletePoll(pollId: number) {
    //Delete the poll
    this._pollService.deletePoll(pollId).subscribe(result => {
      //Delete all associated Participations and load all variables again
      this._participationService.getAllParticipationsByPollId(pollId).subscribe(result => {
        for (let i = 0; i < result.length; i++) {
          this._participationService.deleteParticipation(result[i].participationId).subscribe();
        }
        this.instantiateVariables()
      });
    });

    

  }
  //Fill all variables
  instantiateVariables() {
    //Fill cpolls with the polls created by the user
    this.cpolls=this._pollService.getAllPollsByCreator(parseInt(localStorage.getItem("userId")));
    this._pollService.getAllPollsByCreator(parseInt(localStorage.getItem("userId"))).subscribe(result => {this.cpollsLength = result.length});

    //Fill ppolls with the polls the user participates in
    this.ppolls = this._pollService.getAllPollsByParticipation(parseInt(localStorage.getItem("userId")));
    this._pollService.getAllPollsByParticipation(parseInt(localStorage.getItem("userId"))).subscribe(result => {this.ppollsLength = result.length});

    //Set notificationamount with the amount of received notifications of the user
    this._notificationService.getAllNotificationsByReceiver(parseInt(localStorage.getItem("userId"))).subscribe(result => {
      this.notificationAmount = result.length;
    });

    //Set name with the name of the current user
    this._userService.getUser(parseInt(localStorage.getItem("userId"))).subscribe(result => { this.name = result.username });
  }
  //Logout the user
  logout(event: Event) {
    //Set every localStorage item to false or empty and go back to the main page
    localStorage.setItem("loggedIn", "false");
    localStorage.setItem("userId", "");
    localStorage.setItem("token", "");
    this.router.navigateByUrl('/');
  }

  //Go to the notification page
  goToNot() {
    this.router.navigateByUrl('/notification');
  }

  ngOnInit() {
  }


}
