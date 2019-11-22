import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Poll } from '../models/poll.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private http: HttpClient, private _userService: UserService) { }

  //Get a list of all polls
  getAllPolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>("https://localhost:44311/api/Poll");
  }

  //Get a list of polls by creatorId
  getAllPollsByCreator(userId: number): Observable<Poll[]> {
    return this.http.get<Poll[]>("https://localhost:44311/api/Poll/creator/" + userId);
  }

  //Get a list of polls that a user participates in
  getAllPollsByParticipation(userId: number): Observable<Poll[]> {
    return this.http.get<Poll[]>("https://localhost:44311/api/Participation/polls/" + userId)
  }

  //Get a poll by pollId
  getPoll(pollId: number): Observable<Poll> {
    return this.http.get<Poll>("https://localhost:44311/api/Poll/" + pollId);
  }

  //Add poll
  addPoll(poll: Poll) {
    return this.http.post<Poll>("https://localhost:44311/api/Poll", poll);
  }

  //Delete poll
  deletePoll(pollID: number) {
    return this.http.delete<Poll>("https://localhost:44311/api/Poll/" + pollID);
  }
}
